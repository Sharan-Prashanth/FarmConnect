"use server"

import { db } from "@/lib/db"
import type { Contract } from "@/lib/types"

/**
 * Create a new contract
 */
export async function createContract(contractData: Partial<Contract>) {
  try {
    const contract = await db.contract.create({
      data: contractData,
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
  status?: string
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
 * Update an existing contract
 */
export async function updateContract(contractId: string, contractData: Partial<Contract>) {
  try {
    const contract = await db.contract.update({
      where: { id: contractId },
      data: contractData,
    })

    return { success: true, data: contract }
  } catch (error) {
    console.error("Error updating contract:", error)
    return { success: false, error: "Failed to update contract" }
  }
}

/**
 * Change contract status
 */
export async function updateContractStatus(contractId: string, status: string) {
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

