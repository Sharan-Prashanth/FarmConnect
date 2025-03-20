"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Share2, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactSellerModal } from "@/components/contact-seller-modal"

export default function MarketplaceListingDetails() {
  const { id } = useParams()
  const [showContactModal, setShowContactModal] = useState(false)

  // Mock listing data
  const listing = {
    id: id as string,
    title: "Premium Organic Wheat",
    description:
      "High-quality organic wheat grown using sustainable farming practices. This premium wheat variety is perfect for various food processing applications, including flour production, baking, and pasta making. Our wheat is cultivated using environmentally friendly methods, without the use of synthetic fertilizers or pesticides.",
    crop: "Wheat",
    quantity: 5000,
    unit: "kg",
    pricePerUnit: 35.5,
    totalValue: 177500,
    location: "Punjab Region, India",
    availableFrom: new Date("2025-05-15"),
    availableTo: new Date("2025-08-30"),
    harvestDate: new Date("2025-04-30"),
    images: [
      "/wheat1.jpeg",
      "/wheat2.jpeg",
      "/paddy1.jpeg",
    ],
    seller: {
      id: "S-1001",
      name: "Green Fields Farm",
      rating: 4.8,
      verified: true,
      memberSince: "2021",
      totalDeals: 56,
      location: "Amritsar, Punjab",
      profileImage: "/placeholder.svg?height=100&width=100",
    },
    specifications: [
      { name: "Variety", value: "HD-2967 (High Yield)" },
      { name: "Protein Content", value: "12-13%" },
      { name: "Moisture", value: "Max 14%" },
      { name: "Foreign Matter", value: "Max 0.5%" },
      { name: "Certification", value: "Organic" },
      { name: "Growing Method", value: "Sustainable Farming" },
    ],
    similarListings: [
      {
        id: "M-1002",
        title: "Premium Quality Rice",
        crop: "Rice",
        quantity: 3000,
        unit: "kg",
        pricePerUnit: 42.25,
        image: "/basmati rice.jpg",
      },
      {
        id: "M-1003",
        title: "Organic Corn",
        crop: "Corn",
        quantity: 2000,
        unit: "kg",
        pricePerUnit: 28.75,
        image: "/corn.jpeg",
      },
      {
        id: "M-1004",
        title: "Fresh Potatoes",
        crop: "Potatoes",
        quantity: 4000,
        unit: "kg",
        pricePerUnit: 18.5,
        image: "/potato.jpeg",
      },
    ],
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/marketplace" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Product Images */}
          <div className="rounded-lg overflow-hidden border">
            <img src={listing.images[0] || "/Wheat.jpeg"} alt={listing.title} className="w-full h-auto" />
          </div>

          <div className="flex overflow-auto gap-2 pb-2">
            {listing.images.map((image, index) => (
              <div
                key={index}
                className="rounded-md overflow-hidden border min-w-[100px] cursor-pointer hover:border-primary"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${listing.title} ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="seller">Seller Info</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                  <div>
                    <p className="text-muted-foreground">{listing.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Available From</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p>{formatDate(listing.availableFrom)}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Available To</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p>{formatDate(listing.availableTo)}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Harvest Date</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p>{formatDate(listing.harvestDate)}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p>{listing.location}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="space-y-4">
                  <div className="space-y-4">
                    {listing.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{spec.name}:</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="seller" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={listing.seller.profileImage} alt={listing.seller.name} />
                      <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{listing.seller.name}</h3>
                        {listing.seller.verified && <Badge variant="secondary">Verified</Badge>}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span>{listing.seller.rating} Rating</span>
                        <span className="mx-1">•</span>
                        <span>{listing.seller.totalDeals} Deals</span>
                        <span className="mx-1">•</span>
                        <span>Member since {listing.seller.memberSince}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{listing.seller.location}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Similar Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Listings</CardTitle>
              <CardDescription>You might also be interested in these listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {listing.similarListings.map((item) => (
                  <Link href={`/marketplace/${item.id}`} key={item.id} className="group">
                    <div className="border rounded-lg overflow-hidden hover:border-primary transition-colors">
                      <div className="h-32 overflow-hidden">
                        <img
                          src={item.image || "/wheat1.jpeg"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium line-clamp-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.crop} • {item.quantity} {item.unit}
                        </p>
                        <p className="font-semibold mt-1">
                          ₹{item.pricePerUnit.toFixed(2)}/{item.unit}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <p className="text-muted-foreground">{listing.crop}</p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price per unit:</span>
                <span className="font-medium">
                  ₹{listing.pricePerUnit.toFixed(2)}/{listing.unit}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium">
                  {listing.quantity.toLocaleString()} {listing.unit}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center font-semibold">
                <span>Total Value:</span>
                <span className="text-lg">₹{listing.totalValue.toLocaleString()}</span>
              </div>

              <div className="space-y-2 pt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setShowContactModal(true)}>
                  Contact Seller
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" /> Share Listing
                </Button>
              </div>

              <div className="border rounded-md p-3 bg-muted/50 text-sm">
                <p className="font-medium mb-1">Buying Process:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Contact the seller for more details</li>
                  <li>Negotiate terms and prices if needed</li>
                  <li>Create a formal contract for the purchase</li>
                  <li>Complete the transaction securely through our platform</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seller Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={listing.seller.profileImage} alt={listing.seller.name} />
                  <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{listing.seller.name}</p>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span className="ml-1">{listing.seller.rating} Rating</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => setShowContactModal(true)}>
                Message Seller
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Seller Modal */}
      <ContactSellerModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        listingTitle={listing.title}
        sellerName={listing.seller.name}
      />
    </div>
  )
}

