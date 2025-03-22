export type UserRole = "farmer" | "buyer" | "agent" | "admin"

export interface UserSession {
  id: string
  name: string
  email: string
  role: UserRole
  image?: string
  verified: boolean
}

export interface User extends UserSession {
  password: string
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface Contract {
  id: string
  title: string
  description: string
  farmerId: string
  buyerId: string
  agentId?: string
  crop: string
  quantity: number
  unit: string
  pricePerUnit: number
  totalPrice: number
  deliveryDate: Date
  paymentTerms: string
  qualityParameters: string
  additionalTerms?: string
  status: ContractStatus
  createdAt: Date
  updatedAt: Date
  // Counterparty information
  counterpartyName: string
  counterpartyEmail?: string
  counterpartyPhone?: string
  counterpartyAddress?: string
  counterpartyType: "farmer" | "buyer"
  // Additional fields
  startDate?: Date
  endDate?: Date
  progress?: number
  disputeReason?: string
  disputeDate?: Date
}

export type ContractStatus =
  | "draft"
  | "pending"
  | "negotiating"
  | "accepted"
  | "active"
  | "completed"
  | "cancelled"
  | "disputed"

export interface Transaction {
  id: string
  contractId: string
  amount: number
  type: TransactionType
  status: TransactionStatus
  date: Date
  description: string
  fromId: string
  toId: string
}

export type TransactionType = "advance" | "partial" | "final" | "refund"

export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled"

export interface Negotiation {
  id: string
  contractId: string
  initiatorId: string
  respondentId: string
  proposedChanges: {
    field: string
    oldValue: any
    newValue: any
  }[]
  status: NegotiationStatus
  message: string
  createdAt: Date
  updatedAt: Date
}

export type NegotiationStatus = "pending" | "accepted" | "rejected" | "counter"

export interface PricePrediction {
  id: string
  crop: string
  region: string
  predictedPrice: number
  confidence: number
  factors: {
    name: string
    impact: number
  }[]
  date: Date
  createdAt: Date
}

export interface MarketplaceListing {
  id: string
  userId: string
  title: string
  description: string
  crop: string
  quantity: number
  unit: string
  pricePerUnit: number
  location: string
  availableFrom: Date
  availableTo: Date
  images: string[]
  status: "active" | "closed" | "draft"
  createdAt: Date
  updatedAt: Date
}

