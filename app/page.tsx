import Link from "next/link"
import { ArrowRight, CheckCircle, Handshake, LineChart, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Connecting Farmers & Buyers Through Assured Contracts
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Secure, transparent, and reliable contract farming platform that benefits both farmers and buyers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <img
              src="/contract.jpg"
              width={550}
              height={550}
              alt="Farm Contract"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Our Platform?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides everything needed for successful contract farming relationships.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <Handshake className="h-6 w-6 text-green-600 dark:text-green-200" />
              </div>
              <h3 className="text-xl font-bold">Secure Contracts</h3>
              <p className="text-center text-muted-foreground">
                Legally binding digital contracts with clear terms and conditions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-200" />
              </div>
              <h3 className="text-xl font-bold">Verified Partners</h3>
              <p className="text-center text-muted-foreground">
                All buyers and farmers are verified to ensure trust and reliability.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <LineChart className="h-6 w-6 text-green-600 dark:text-green-200" />
              </div>
              <h3 className="text-xl font-bold">Price Predictions</h3>
              <p className="text-center text-muted-foreground">
                Data-driven price forecasts to help make informed decisions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-200" />
              </div>
              <h3 className="text-xl font-bold">Quality Assurance</h3>
              <p className="text-center text-muted-foreground">
                Standardized quality parameters and inspection processes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Marketplace</h3>
              <p className="text-center text-muted-foreground">
                Connect with potential partners and explore new opportunities.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
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
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Transparent Payments</h3>
              <p className="text-center text-muted-foreground">
                Secure payment system with complete transaction history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Farming Business?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of farmers and buyers already benefiting from our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

