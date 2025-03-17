"use client";

import { useState, useEffect } from "react";
import { fetchNegotiations } from "@/lib/negotiation-actions";

export default function NegotiationList() {
  const [isLoading, setIsLoading] = useState(true);
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");

  // Fetch negotiations on component mount
  useEffect(() => {
    const loadNegotiations = async () => {
      try {
        const data = await fetchNegotiations();
        setNegotiations(data);
      } catch (error) {
        console.error("Failed to fetch negotiations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNegotiations();
  }, []);

  // Mock data for demonstration
  const mockNegotiations = [
    {
      id: "N-1001",
      title: "Wheat Supply Contract Negotiation",
      counterparty: {
        name: "FreshFoods Ltd",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      crop: "Wheat",
      quantity: "50 tons",
      initialPrice: "₹2,000 per quintal",
      currentPrice: "₹2,200 per quintal",
      status: "In Progress",
      lastUpdated: "2023-08-25",
      messages: 12,
      daysRemaining: 3,
    },
    {
      id: "N-1002",
      title: "Organic Rice Agreement Negotiation",
      counterparty: {
        name: "Organic Eats",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      crop: "Rice",
      quantity: "30 tons",
      initialPrice: "₹3,200 per quintal",
      currentPrice: "₹3,500 per quintal",
      status: "In Progress",
      lastUpdated: "2023-08-23",
      messages: 8,
      daysRemaining: 2,
    },
    {
      id: "N-1003",
      title: "Potato Supply Contract Negotiation",
      counterparty: {
        name: "SnackMakers Inc",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      crop: "Potatoes",
      quantity: "40 tons",
      initialPrice: "₹1,600 per quintal",
      currentPrice: "₹1,800 per quintal",
      status: "Awaiting Response",
      lastUpdated: "2023-08-20",
      messages: 6,
      daysRemaining: 1,
    },
    {
      id: "N-1004",
      title: "Tomato Supply Contract Negotiation",
      counterparty: {
        name: "TastyFoods",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      crop: "Tomatoes",
      quantity: "20 tons",
      initialPrice: "₹2,300 per quintal",
      currentPrice: "₹2,500 per quintal",
      status: "Accepted",
      lastUpdated: "2023-08-18",
      messages: 10,
      daysRemaining: 0,
    },
    {
      id: "N-1005",
      title: "Onion Supply Agreement Negotiation",
      counterparty: {
        name: "Global Exports Ltd",
        type: "Buyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      crop: "Onions",
      quantity: "35 tons",
      initialPrice: "₹1,800 per quintal",
      currentPrice: "₹2,000 per quintal",
      status: "Rejected",
      lastUpdated: "2023-08-15",
      messages: 7,
      daysRemaining: 0,
    },
  ];

  // Filter negotiations based on search query and status
  const filteredNegotiations = mockNegotiations
    .filter((negotiation) => {
      const matchesSearch =
        negotiation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        negotiation.counterparty.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        negotiation.crop.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        negotiation.status.toLowerCase().includes(statusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);

      return dateSort === "newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  if (isLoading) {
    return <p>Loading negotiations...</p>;
  }

  return (
    <div>
      <h2>Negotiations</h2>
      <input
        type="text"
        placeholder="Search by title, counterparty, or crop..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All Status</option>
        <option value="In Progress">In Progress</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
        <option value="Awaiting Response">Awaiting Response</option>
      </select>
      <select value={dateSort} onChange={(e) => setDateSort(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      <ul>
        {filteredNegotiations.map((negotiation) => (
          <li key={negotiation.id}>
            <h3>{negotiation.title}</h3>
            <p>
              <strong>Counterparty:</strong> {negotiation.counterparty.name} (
              {negotiation.counterparty.type})
            </p>
            <p>
              <strong>Crop:</strong> {negotiation.crop}
            </p>
            <p>
              <strong>Quantity:</strong> {negotiation.quantity}
            </p>
            <p>
              <strong>Initial Price:</strong> {negotiation.initialPrice}
            </p>
            <p>
              <strong>Current Price:</strong> {negotiation.currentPrice}
            </p>
            <p>
              <strong>Status:</strong> {negotiation.status}
            </p>
            <p>
              <strong>Last Updated:</strong> {negotiation.lastUpdated}
            </p>
            <p>
              <strong>Messages:</strong> {negotiation.messages}
            </p>
            <p>
              <strong>Days Remaining:</strong> {negotiation.daysRemaining}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
