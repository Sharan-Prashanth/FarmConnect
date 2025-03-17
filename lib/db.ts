import type { Contract, MarketplaceListing, Negotiation, PricePrediction, Transaction, User } from "@/lib/types"

// Mock data
const users: User[] = [
  // Add static user for testing
  {
    id: "static-user-id",
    name: "Sharan Kumar",
    email: "sharan@gmail.com",
    password: "12345678", // In a real app, this would be hashed
    role: "farmer",
    phone: "+91 98765 43210",
    address: "123 Farm Road, Agricultural District, India",
    verified: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
]
const contracts: Contract[] = []
const transactions: Transaction[] = []
const negotiations: Negotiation[] = []
const predictions: PricePrediction[] = []
const listings: MarketplaceListing[] = []

// Generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Database operations
export const db = {
  user: {
    create: async (data: { data: Partial<User> }) => {
      const user: User = {
        id: generateId(),
        name: data.data.name || "",
        email: data.data.email || "",
        password: data.data.password || "",
        role: data.data.role || "farmer",
        phone: data.data.phone || "",
        address: data.data.address || "",
        verified: data.data.verified || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(user)
      return user
    },
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) {
        return users.find((user) => user.id === where.id) || null
      }
      if (where.email) {
        return users.find((user) => user.email === where.email) || null
      }
      return null
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<User> }) => {
      const index = users.findIndex((user) => user.id === where.id)
      if (index === -1) return null

      users[index] = { ...users[index], ...data, updatedAt: new Date() }
      return users[index]
    },
    findMany: async ({ where }: { where?: { role?: string } } = {}) => {
      if (where?.role) {
        return users.filter((user) => user.role === where.role)
      }
      return users
    },
  },
  contract: {
    create: async (data: { data: Partial<Contract> }) => {
      const contract: Contract = {
        id: generateId(),
        title: data.data.title || "",
        description: data.data.description || "",
        farmerId: data.data.farmerId || "",
        buyerId: data.data.buyerId || "",
        agentId: data.data.agentId,
        crop: data.data.crop || "",
        quantity: data.data.quantity || 0,
        unit: data.data.unit || "kg",
        pricePerUnit: data.data.pricePerUnit || 0,
        totalPrice: data.data.totalPrice || 0,
        deliveryDate: data.data.deliveryDate || new Date(),
        paymentTerms: data.data.paymentTerms || "",
        qualityParameters: data.data.qualityParameters || "",
        status: data.data.status || "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      contracts.push(contract)
      return contract
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return contracts.find((contract) => contract.id === where.id) || null
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<Contract> }) => {
      const index = contracts.findIndex((contract) => contract.id === where.id)
      if (index === -1) return null

      contracts[index] = { ...contracts[index], ...data, updatedAt: new Date() }
      return contracts[index]
    },
    findMany: async ({ where }: { where?: { farmerId?: string; buyerId?: string; status?: string } } = {}) => {
      let results = contracts

      if (where?.farmerId) {
        results = results.filter((contract) => contract.farmerId === where.farmerId)
      }

      if (where?.buyerId) {
        results = results.filter((contract) => contract.buyerId === where.buyerId)
      }

      if (where?.status) {
        results = results.filter((contract) => contract.status === where.status)
      }

      return results
    },
  },
  transaction: {
    create: async (data: { data: Partial<Transaction> }) => {
      const transaction: Transaction = {
        id: generateId(),
        contractId: data.data.contractId || "",
        amount: data.data.amount || 0,
        type: data.data.type || "advance",
        status: data.data.status || "pending",
        date: data.data.date || new Date(),
        description: data.data.description || "",
        fromId: data.data.fromId || "",
        toId: data.data.toId || "",
      }
      transactions.push(transaction)
      return transaction
    },
    findMany: async ({ where }: { where?: { contractId?: string; fromId?: string; toId?: string } } = {}) => {
      let results = transactions

      if (where?.contractId) {
        results = results.filter((transaction) => transaction.contractId === where.contractId)
      }

      if (where?.fromId) {
        results = results.filter((transaction) => transaction.fromId === where.fromId)
      }

      if (where?.toId) {
        results = results.filter((transaction) => transaction.toId === where.toId)
      }

      return results
    },
  },
  negotiation: {
    create: async (data: { data: Partial<Negotiation> }) => {
      const negotiation: Negotiation = {
        id: generateId(),
        contractId: data.data.contractId || "",
        initiatorId: data.data.initiatorId || "",
        respondentId: data.data.respondentId || "",
        proposedChanges: data.data.proposedChanges || [],
        status: data.data.status || "pending",
        message: data.data.message || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      negotiations.push(negotiation)
      return negotiation
    },
    findMany: async ({
      where,
    }: { where?: { contractId?: string; initiatorId?: string; respondentId?: string } } = {}) => {
      let results = negotiations

      if (where?.contractId) {
        results = results.filter((negotiation) => negotiation.contractId === where.contractId)
      }

      if (where?.initiatorId) {
        results = results.filter((negotiation) => negotiation.initiatorId === where.initiatorId)
      }

      if (where?.respondentId) {
        results = results.filter((negotiation) => negotiation.respondentId === where.respondentId)
      }

      return results
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<Negotiation> }) => {
      const index = negotiations.findIndex((negotiation) => negotiation.id === where.id)
      if (index === -1) return null

      negotiations[index] = { ...negotiations[index], ...data, updatedAt: new Date() }
      return negotiations[index]
    },
  },
  prediction: {
    create: async (data: { data: Partial<PricePrediction> }) => {
      const prediction: PricePrediction = {
        id: generateId(),
        crop: data.data.crop || "",
        region: data.data.region || "",
        predictedPrice: data.data.predictedPrice || 0,
        confidence: data.data.confidence || 0,
        factors: data.data.factors || [],
        date: data.data.date || new Date(),
        createdAt: new Date(),
      }
      predictions.push(prediction)
      return prediction
    },
    findMany: async ({ where }: { where?: { crop?: string; region?: string } } = {}) => {
      let results = predictions

      if (where?.crop) {
        results = results.filter((prediction) => prediction.crop === where.crop)
      }

      if (where?.region) {
        results = results.filter((prediction) => prediction.region === where.region)
      }

      return results
    },
  },
  marketplace: {
    create: async (data: { data: Partial<MarketplaceListing> }) => {
      const listing: MarketplaceListing = {
        id: generateId(),
        userId: data.data.userId || "",
        title: data.data.title || "",
        description: data.data.description || "",
        crop: data.data.crop || "",
        quantity: data.data.quantity || 0,
        unit: data.data.unit || "kg",
        pricePerUnit: data.data.pricePerUnit || 0,
        location: data.data.location || "",
        availableFrom: data.data.availableFrom || new Date(),
        availableTo: data.data.availableTo || new Date(),
        images: data.data.images || [],
        status: data.data.status || "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      listings.push(listing)
      return listing
    },
    findMany: async ({ where }: { where?: { userId?: string; crop?: string; status?: string } } = {}) => {
      let results = listings

      if (where?.userId) {
        results = results.filter((listing) => listing.userId === where.userId)
      }

      if (where?.crop) {
        results = results.filter((listing) => listing.crop === where.crop)
      }

      if (where?.status) {
        results = results.filter((listing) => listing.status === where.status)
      }

      return results
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<MarketplaceListing> }) => {
      const index = listings.findIndex((listing) => listing.id === where.id)
      if (index === -1) return null

      listings[index] = { ...listings[index], ...data, updatedAt: new Date() }
      return listings[index]
    },
  },
}

