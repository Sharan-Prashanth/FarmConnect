"use server"

import { db } from "@/lib/db"
import type { Contract, ContractStatus } from "@/lib/types"

/**
 * Create a new contract
 */
export async function createContract(contractData: Partial<Contract>) {
  try {
    const contract = await db.contract.create({
      data: {
        ...contractData,
        status: (contractData.status || "draft") as ContractStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    return { success: true, data: contract }
  } catch (error) {
    console.error("Error creating contract:", error)
    return { success: false, error: "Failed to create contract" }
  }
}

/**
 * Fetch a single contract by ID
 */
export async function fetchContractDetails(contractId: string) {
  try {
    const contract = await db.contract.findUnique({
      where: { id: contractId },
    })

    if (!contract) {
      return { success: false, error: "Contract not found" }
    }

    return { success: true, data: contract }
  } catch (error) {
    console.error("Error fetching contract:", error)
    return { success: false, error: "Failed to fetch contract details" }
  }
}

/**
 * Fetch contracts with optional filters
 */
export async function fetchContracts(filters?: {
  farmerId?: string
  buyerId?: string
  status?: ContractStatus
}) {
  try {
    const contracts = await db.contract.findMany({
      where: filters,
    })
    return { success: true, data: contracts }
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return { success: false, error: "Failed to fetch contracts" }
  }
}

/**
 * Update contract status
 */
export async function updateContractStatus(contractId: string, status: ContractStatus) {
  try {
    const contract = await db.contract.update({
      where: { id: contractId },
      data: { status },
    })

    return { success: true, data: contract }
  } catch (error) {
    console.error("Error updating contract status:", error)
    return { success: false, error: "Failed to update contract status" }
  }
}

/**
 * Update contract details
 */
export async function updateContract(contractId: string, data: Partial<Contract>) {
  try {
    const contract = await db.contract.update({
      where: { id: contractId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return { success: true, data: contract }
  } catch (error) {
    console.error("Error updating contract:", error)
    return { success: false, error: "Failed to update contract" }
  }
}

/**
 * Delete a contract (not typically used - contracts are usually archived or marked as cancelled)
 */
export async function deleteContract(contractId: string) {
  try {
    // In a real application, you might want to archive instead of delete
    const contract = await db.contract.update({
      where: { id: contractId },
      data: { status: "cancelled" },
    })

    return { success: true, data: contract }
  } catch (error) {
    console.error("Error deleting contract:", error)
    return { success: false, error: "Failed to delete contract" }
  }
}

/**
 * Move contract to negotiation stage
 */
export async function moveToNegotiation(contractId: string, negotiationDetails: {
  proposedPrice?: number
  proposedQuantity?: number
  proposedDeliveryDate?: Date
  comments?: string
}) {
  try {
    const contract = await db.contract.update({
      where: { id: contractId },
      data: { 
        status: "negotiating",
        updatedAt: new Date(),
      },
    })

    // In a real application, you would also create a negotiation record here
    // with the proposed changes and comments

    return { success: true, data: contract }
  } catch (error) {
    console.error("Error moving contract to negotiation:", error)
    return { success: false, error: "Failed to move contract to negotiation stage" }
  }
}

