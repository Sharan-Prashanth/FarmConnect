"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactSellerModal } from "@/components/contact-seller-modal"

interface Seller {
  name: string
  rating: number
  verified: boolean
}

interface Listing {
  id: string
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
  seller: Seller
}

interface MarketplaceListingCardProps {
  listing: Listing
}

export function MarketplaceListingCard({ listing }: MarketplaceListingCardProps) {
  const [showContactModal, setShowContactModal] = useState(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={listing.images[0] || "/placeholder.svg"}
            alt={listing.title}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>{listing.crop}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
              {listing.quantity.toLocaleString()} {listing.unit}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {listing.location}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="ml-1 text-sm font-medium">{listing.seller.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">• {listing.seller.name}</span>
                {listing.seller.verified && (
                  <Badge variant="secondary" className="h-5 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{listing.pricePerUnit.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">per {listing.unit}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Available: {formatDate(listing.availableFrom)} - {formatDate(listing.availableTo)}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/marketplace/${listing.id}`}>View Details</Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowContactModal(true)}>
            Contact Seller
          </Button>
        </CardFooter>
      </Card>

      {/* Contact Seller Modal */}
      <ContactSellerModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        listingTitle={listing.title}
        sellerName={listing.seller.name}
      />
    </>
  )
}

