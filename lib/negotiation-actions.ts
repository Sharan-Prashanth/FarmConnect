"use server"

import { db } from "@/lib/db"
import { z } from "zod"

const getNegotiationsSchema = z.object({
  userId: z.string(),
  status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(10),
})

export async function getNegotiations(data: z.infer<typeof getNegotiationsSchema>) {
  const { userId, status, page, limit } = getNegotiationsSchema.parse(data)

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const skip = (page - 1) * limit

  const where = {
    ...(status && { status }),
    OR: [{ farmerId: userId }, { buyerId: userId }, { agentId: userId }],
  }

  const [negotiations, totalCount] = await Promise.all([
    db.negotiation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        farmer: { select: { firstName: true, lastName: true } },
        buyer: { select: { firstName: true, lastName: true } },
        agent: { select: { firstName: true, lastName: true } },
      },
    }),
    db.negotiation.count({ where }),
  ])

  return {
    negotiations,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  }
}

const createNegotiationSchema = z.object({
  farmerId: z.string(),
  buyerId: z.string(),
  agentId: z.string().optional(),
  listingId: z.string(),
  initialOffer: z.number().positive(),
})

export async function createNegotiation(data: z.infer<typeof createNegotiationSchema>) {
  const validatedData = createNegotiationSchema.parse(data)

  const negotiation = await db.negotiation.create({
    data: {
      ...validatedData,
      status: "ACTIVE",
    },
  })

  // Create initial message
  await db.negotiationMessage.create({
    data: {
      negotiationId: negotiation.id,
      senderId: validatedData.buyerId,
      content: `Initial offer: $${validatedData.initialOffer}`,
    },
  })

  return negotiation
}

const addNegotiationMessageSchema = z.object({
  negotiationId: z.string(),
  userId: z.string(),
  content: z.string(),
  offer: z.number().positive().optional(),
})

export async function addNegotiationMessage(data: z.infer<typeof addNegotiationMessageSchema>) {
  const { negotiationId, userId, content, offer } = addNegotiationMessageSchema.parse(data)

  const negotiation = await db.negotiation.findUnique({
    where: { id: negotiationId },
    select: { farmerId: true, buyerId: true, agentId: true },
  })

  if (!negotiation) {
    throw new Error("Negotiation not found")
  }

  if (![negotiation.farmerId, negotiation.buyerId, negotiation.agentId].includes(userId)) {
    throw new Error("You don't have permission to add a message to this negotiation")
  }

  const message = await db.negotiationMessage.create({
    data: {
      negotiationId,
      senderId: userId,
      content,
      offer,
    },
  })

  return message
}

const updateNegotiationStatusSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]),
})

export async function updateNegotiationStatus(data: z.infer<typeof updateNegotiationStatusSchema>) {
  const { id, userId, status } = updateNegotiationStatusSchema.parse(data)

  const negotiation = await db.negotiation.findUnique({
    where: { id },
    select: { farmerId: true, buyerId: true, agentId: true },
  })

  if (!negotiation) {
    throw new Error("Negotiation not found")
  }

  if (![negotiation.farmerId, negotiation.buyerId, negotiation.agentId].includes(userId)) {
    throw new Error("You don't have permission to update this negotiation")
  }

  const updatedNegotiation = await db.negotiation.update({
    where: { id },
    data: { status },
  })

  return updatedNegotiation
}

