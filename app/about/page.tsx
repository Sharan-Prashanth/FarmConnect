import Link from "next/link"
import { ArrowRight, Award, Building, Globe, Leaf, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About AgriContract</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Transforming contract farming through technology, transparency, and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Empowering Farmers and Buyers Through Secure Contracts
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                AgriContract was founded with a clear mission: to create a fair, transparent, and efficient ecosystem
                for contract farming. We believe that by connecting farmers directly with buyers through secure,
                technology-enabled contracts, we can help reduce income fluctuations, minimize market risks, and create
                sustainable agricultural value chains.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Join Our Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Our Mission"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800">Our Values</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What We Stand For</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our core values guide everything we do at AgriContract.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Shield className="h-8 w-8 text-green-600" />
                <CardTitle>Trust & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We build trust through secure, transparent contracts and verified users, ensuring all parties can
                  transact with confidence.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-green-600" />
                <CardTitle>Farmer-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We prioritize the needs of farmers, ensuring they have access to fair prices, stable markets, and the
                  tools to succeed.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Globe className="h-8 w-8 text-green-600" />
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We promote sustainable farming practices and responsible business relationships that benefit
                  communities and the environment.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Award className="h-8 w-8 text-green-600" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We strive for excellence in our platform, our service, and the outcomes we create for our users.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Leaf className="h-8 w-8 text-green-600" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We continuously innovate to solve agricultural challenges through technology and creative solutions.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Building className="h-8 w-8 text-green-600" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We build strong communities of farmers, buyers, and agents who support each other and share knowledge.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800">Our Team</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet the People Behind AgriContract
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our diverse team brings together expertise in agriculture, technology, and business.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-4">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Team Member ${i}`}
                  width={200}
                  height={200}
                  alt={`Team Member ${i}`}
                  className="rounded-full object-cover"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Team Member {i}</h3>
                  <p className="text-sm text-muted-foreground">Position</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Us in Transforming Agriculture
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Be part of our mission to create a more equitable and sustainable agricultural ecosystem.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button size="lg" variant="outline">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

