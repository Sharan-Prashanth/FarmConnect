"use client"

import { useState } from "react"
import { Filter, Search, SlidersHorizontal } from "lucide-react"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceListingCard } from "@/components/marketplace-listing-card"

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const route = useRouter();
  const router = useRouter();
  const createListingButton = (
    <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/contract-list/create")}>
      Create a Listing
    </Button>
  );

  const poda_angutu = (
    <Button className="bg-green-600 hover:bg-green-700" onClick={() => route.push("/contract-list/create")}>
      Create a Listing
    </Button>
  );

  const lets_go = (
    <Button onClick={() => route.push("/contract-list")}>
      Browse Contracts
    </Button>
  )
  // Mock data for marketplace listings
  const listings = [
    {
      id: "1",
      title: "Premium - Wheat",
      description: "High-quality organic wheat grown using sustainable farming practices.",
      crop: "Wheat",
      quantity: 5000,
      unit: "kg",
      pricePerUnit: 75.50,
      location: "Midwest Region",
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      images: ["/Wheat.jpeg"],
      seller: {
        name: "Green Fields Farm",
        rating: 4.8,
        verified: true,
      },
    },
    {
      id: "2",
      title: "Paddy",
      description: "High-quality paddy grown using natural farming methods, ensuring excellent yield. Suitable for milling into rice or direct consumption.",
      crop: "Paddy",
      quantity: 10000,
      unit: "kg",
      pricePerUnit: 45.25,
      location: "Southern Region",
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      images: ["/paddy.jpg"],
      seller: {
        name: "Sunshine Farms",
        rating: 4.5,
        verified: true,
      },
    },
    {
      id: "3",
      title: "Bangalore Tomato",
      description: "Vine-ripened tomatoes, perfect for processing or fresh market.",
      crop: "Tomatoes",
      quantity: 8000,
      unit: "kg",
      pricePerUnit: 25.28,
      location: "Western Region",
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      images: ["/tomato.jpg"],
      seller: {
        name: "Delta Growers",
        rating: 4.7,
        verified: true,
      },
    },
    {
      id: "4",
      title: "Turmeric",
      description: "Organic turmeric with rich nutrients, perfect for cooking and medicinal use.",
      crop: "Turmeric",
      quantity: 6000,
      unit: "kg",
      pricePerUnit: 20.50,
      location: "Northern Region",
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      images: ["/tur.jpg"],
      seller: {
        name: "Organic Valley Farms",
        rating: 4.9,
        verified: true,
      },
    },
    {
      id: "5",
      title: "Basmati Rice",
      description: "",
      crop: "rice",
      quantity: 2000,
      unit: "kg",
      pricePerUnit: 80.50,
      location: "Western Region",
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      images: ["/basmati rice.jpg"],
      seller: {
        name: "Red Harvest Farms",
        rating: 4.6,
        verified: false,
      },
    },
    {
      id: "6",
      title: "Premium Coffee Beans",
      description: "Shade-grown arabica coffee beans with excellent flavor profile.",
      crop: "Coffee",
      quantity: 1000,
      unit: "kg",
      pricePerUnit: 55,
      location: "Mountain Region",
      availableFrom: new Date(),
      availableTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      images: ["/tea.jpg"],
      seller: {
        name: "Highland Coffee Estates",
        rating: 4.9,
        verified: true,
      },
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Agricultural Marketplace</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Connect with farmers and buyers to find the best agricultural products and opportunities.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search crops, products, or sellers..."
                  className="w-full bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="buy" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <TabsList>
                <TabsTrigger value="buy">Buy Products</TabsTrigger>
                <TabsTrigger value="sell">Sell Products</TabsTrigger>
                <TabsTrigger value="contracts">Contract Opportunities</TabsTrigger>
              </TabsList>
              <Button variant="outline" className="mt-4 sm:mt-0" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Filter Options</CardTitle>
                  <CardDescription>Refine your search with these filters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="grains">Grains</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                          <SelectItem value="livestock">Livestock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="north">Northern Region</SelectItem>
                          <SelectItem value="south">Southern Region</SelectItem>
                          <SelectItem value="east">Eastern Region</SelectItem>
                          <SelectItem value="west">Western Region</SelectItem>
                          <SelectItem value="central">Central Region</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certification">Certification</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="certification">
                          <SelectValue placeholder="Select certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Certifications</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                          <SelectItem value="fairtrade">Fair Trade</SelectItem>
                          <SelectItem value="nonGMO">Non-GMO</SelectItem>
                          <SelectItem value="rainforest">Rainforest Alliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price Range ($ per unit)</Label>
                      <div className="pt-4">
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setPriceRange([0, 100])
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </CardFooter>
              </Card>
            )}

            <TabsContent value="buy" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <MarketplaceListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sell">
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-green-600 dark:text-green-200"
                  >
                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                    <path d="M12 11.5v-4" />
                    <path d="m9 9.5 3-2 3 2" />
                    <path d="M3 21h18" />
                  </svg>
                </div>
                  <h3 className="text-xl font-bold">Create a Listing</h3>
                <p className="text-center text-muted-foreground max-w-[600px]">
                  Start selling your agricultural products by creating a listing. Reach thousands of potential buyers.
                </p>
                {createListingButton}
              </div>
            </TabsContent>

            <TabsContent value="contracts">
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-green-600 dark:text-green-200"
                  >
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
                    <line x1="9" y1="9" x2="10" y2="9" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                    <line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Contract Opportunities</h3>
                <p className="text-center text-muted-foreground max-w-[600px]">
                  Browse contract farming opportunities or create your own contract offers.
                </p>
                <div className="flex gap-4">
                  {lets_go}
                  {poda_angutu}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

