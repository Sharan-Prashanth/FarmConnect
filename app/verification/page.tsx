"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Leaf, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Verification() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false)
      setIsVerified(true)
    }, 2000)
  }

  if (isVerified) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-center">Verification Successful!</CardTitle>
            <CardDescription className="text-center">
              Your account has been verified successfully. You can now access all features of the platform.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/dashboard")} className="bg-green-600 hover:bg-green-700">
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-center">Verify Your Account</CardTitle>
          <CardDescription className="text-center">
            Complete the verification process to access all features
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="documents">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="identity">Identity</TabsTrigger>
          </TabsList>
          <TabsContent value="documents">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="business-license">Business License/Registration</Label>
                  <div className="flex items-center gap-2">
                    <Input id="business-license" type="file" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-certificate">Tax Certificate</Label>
                  <div className="flex items-center gap-2">
                    <Input id="tax-certificate" type="file" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-statement">Bank Statement</Label>
                  <div className="flex items-center gap-2">
                    <Input id="bank-statement" type="file" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Submit Documents"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="identity">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="id-proof">Government ID Proof</Label>
                  <div className="flex items-center gap-2">
                    <Input id="id-proof" type="file" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-proof">Address Proof</Label>
                  <div className="flex items-center gap-2">
                    <Input id="address-proof" type="file" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selfie">Selfie with ID</Label>
                  <div className="flex items-center gap-2">
                    <Input id="selfie" type="file" className="flex-1" />
                    <Button type="button" size="icon" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Identity"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

