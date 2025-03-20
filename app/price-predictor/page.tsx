"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, LineChart, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PriceChart } from "@/components/price-chart";

export default function PricePredictor() {
  const [crop, setCrop] = useState("wheat");
  const [region, setRegion] = useState("midwest");
  const [timeframe, setTimeframe] = useState("3months");
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/predict?crop=${crop}`);
      
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const cp_sujan = await response.json(); // Parse the response as JSON
  
      // Log the response to debug its structure
      console.log("API Response:", cp_sujan);
  
      // Access the predictions array from the response
      const predictions = cp_sujan.predictions;
  
      // Ensure predictions is an array before calling .map()
      if (!Array.isArray(predictions)) {
        throw new Error("Expected an array but got a different data structure");
      }
  
      // Transform the data to extract only the month and price (yhat)
      const historicalPrices = predictions.map((item: any) => ({
        month: new Date(item.ds).toLocaleString('default', { month: 'long' }), // Extract month name
        price: item.yhat, // Extract price
      }));
  
      setData(historicalPrices); // Set the transformed data
  
      setTimeout(() => {
        setPredictionResult({
          crop,
          region,
          predictedPrice: historicalPrices[0].price,
          confidence: 85,
          trend: "up",
          factors: [
            { name: "Weather Patterns", impact: 35 },
            { name: "Global Demand", impact: 25 },
            { name: "Fuel Prices", impact: 15 },
            { name: "Seasonal Trends", impact: 15 },
            { name: "Supply Chain", impact: 10 },
          ],
          historicalPrices: historicalPrices, // Use the transformed data here
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Agricultural Price Predictor</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Make informed decisions with our AI-powered price prediction tool for agricultural commodities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Predictor Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Predict Future Crop Prices</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our advanced algorithm analyzes historical data, weather patterns, market trends, and global events to
                  predict future crop prices with high accuracy.
                </p>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Price Prediction Tool</CardTitle>
                  <CardDescription>Select a crop, region, and timeframe to get a price prediction.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="crop">Crop</Label>
                      <Select value={crop} onValueChange={setCrop}>
                        <SelectTrigger id="crop">
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wheat">Wheat</SelectItem>
                          <SelectItem value="Paddy">Paddy</SelectItem>
                          <SelectItem value="Jowar">Jowar</SelectItem>
                          <SelectItem value="Rice">Rice</SelectItem>
                          <SelectItem value="Bajra">Bajra</SelectItem>
                          <SelectItem value="Maize">Maize</SelectItem>
                          <SelectItem value="Barley">Barley</SelectItem>
                          <SelectItem value="Gram">Gram</SelectItem>
                          <SelectItem value="Ragi">Ragi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">North India</SelectItem>
                          <SelectItem value="south">South India</SelectItem>
                          <SelectItem value="east">East India</SelectItem>
                          <SelectItem value="west">West India</SelectItem>
                          <SelectItem value="central">Central India</SelectItem>
                          <SelectItem value="nationwide">National Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Prediction Timeframe</Label>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger id="timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1month">1 Month</SelectItem>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? "Analyzing Data..." : "Generate Prediction"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            <div className="flex flex-col space-y-4">
              {predictionResult ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Price Prediction Results</CardTitle>
                        <CardDescription>
                          {predictionResult.crop.charAt(0).toUpperCase() + predictionResult.crop.slice(1)} prices in{" "}
                          {predictionResult.region.charAt(0).toUpperCase() + predictionResult.region.slice(1)} region
                        </CardDescription>
                      </div>
                      <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                        <LineChart className="h-6 w-6 text-green-600 dark:text-green-200" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Predicted Price</p>
                        <p className="text-3xl font-bold">₹{predictionResult.predictedPrice.toFixed(2)}</p>
                        <div className="flex items-center mt-1">
                          {predictionResult.trend === "up" ? (
                            <>
                              <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                              <p className="text-sm text-green-600">Upward Trend</p>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="mr-1 h-4 w-4 text-red-600" />
                              <p className="text-sm text-red-600">Downward Trend</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Confidence Level</p>
                        <div className="flex items-center justify-end">
                          <p className="text-3xl font-bold">{predictionResult.confidence}%</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          <Calendar className="inline mr-1 h-3 w-3" />
                          Generated on {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Price Trend</p>
                      <div className="h-[200px] w-full">
                        <PriceChart data={predictionResult.historicalPrices} />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Factors Influencing Price</p>
                      <div className="space-y-2">
                        {predictionResult.factors.map((factor: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <p className="text-sm">{factor.name}</p>
                            <div className="flex items-center">
                              <div className="w-[100px] h-2 rounded-full bg-muted overflow-hidden">
                                <div className="h-full bg-green-600" style={{ width: `${factor.impact}%` }} />
                              </div>
                              <span className="ml-2 text-xs">{factor.impact}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Download Report</Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      View Detailed Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                  <div className="rounded-full bg-green-100 p-6 dark:bg-green-800">
                    <LineChart className="h-12 w-12 text-green-600 dark:text-green-200" />
                  </div>
                  <h3 className="text-xl font-bold">Price Prediction Results</h3>
                  <p className="text-center text-muted-foreground max-w-[400px]">
                    Fill out the form and click "Generate Prediction" to see price forecasts and market insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our price prediction tool uses advanced algorithms and multiple data sources to provide accurate
                forecasts.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We gather historical price data, weather patterns, global market trends, and economic indicators from
                  reliable sources.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our machine learning algorithms analyze the data to identify patterns and correlations that affect
                  crop prices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Price Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Based on the analysis, we generate price predictions with confidence levels and key influencing
                  factors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="farmers">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Benefits</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  How our price prediction tool helps different stakeholders
                </p>
              </div>
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="farmers">Farmers</TabsTrigger>
                <TabsTrigger value="buyers">Buyers</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="farmers" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">For Farmers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Plan planting and harvesting schedules based on predicted price trends</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Negotiate better contract terms with buyers using data-backed insights</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Reduce income fluctuations by locking in favorable prices</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Make informed decisions about crop diversification</span>
                    </li>
                  </ul>
                </div>
                <img
                  src="/farmer.jpg"
                  width={500}
                  height={300}
                  alt="Farmers using price prediction"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </TabsContent>
            <TabsContent value="buyers" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">For Buyers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Optimize procurement strategies based on price forecasts</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Plan budget allocations with greater accuracy</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Secure supply at competitive prices through forward contracts</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Mitigate risks associated with price volatility</span>
                    </li>
                  </ul>
                </div>
                <img
                  src="/buyer.jpg"
                  width={500}
                  height={300}
                  alt="Buyers using price prediction"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </TabsContent>
            <TabsContent value="agents" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">For Agents</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Provide value-added services to clients with data-driven insights</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Facilitate better contract negotiations between farmers and buyers</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Create customized market reports for different agricultural sectors</span>
                    </li>
                    <li className="flex items-start">
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
                        className="mr-2 h-5 w-5 text-green-600"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Advise on optimal timing for contract formation</span>
                    </li>
                  </ul>
                </div>
                <img
                  src="/admin.jpg"
                  width={500}
                  height={300}
                  alt="Agents using price prediction"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

