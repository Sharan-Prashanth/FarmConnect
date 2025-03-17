"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Download, LineChart, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChart } from "@/components/price-chart"

export default function PredictionDetails() {
  const params = useParams()
  const [prediction, setPrediction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch prediction details
    setTimeout(() => {
      setPrediction({
        id: params.id,
        crop: "Wheat",
        region: "Midwest",
        predictedPrice: 8.75,
        confidence: 85,
        trend: "up",
        factors: [
          { name: "Weather Patterns", impact: 35 },
          { name: "Global Demand", impact: 25 },
          { name: "Fuel Prices", impact: 15 },
          { name: "Seasonal Trends", impact: 15 },
          { name: "Supply Chain", impact: 10 },
        ],
        historicalPrices: [
          { month: "Jan", price: 7.2 },
          { month: "Feb", price: 7.5 },
          { month: "Mar", price: 7.8 },
          { month: "Apr", price: 8.0 },
          { month: "May", price: 8.2 },
          { month: "Jun", price: 8.4 },
          { month: "Jul", price: 8.5 },
          { month: "Aug", price: 8.6 },
          { month: "Sep", price: 8.7 },
          { month: "Oct", price: 8.75 },
          { month: "Nov", price: 8.9 },
          { month: "Dec", price: 9.1 },
        ],
        marketInsights: [
          "Global wheat production is expected to increase by 2.3% in the coming season.",
          "Weather conditions in key growing regions remain favorable for wheat cultivation.",
          "Export demand from Asian markets is projected to rise by 5% in the next quarter.",
          "Fuel and fertilizer costs are stabilizing, reducing pressure on production costs.",
          "Government policies in major producing countries continue to support wheat farmers.",
        ],
        recommendations: [
          "Consider forward contracts at current price levels for 50-60% of expected production.",
          "Monitor weather developments in competing export regions for potential price impacts.",
          "Evaluate storage options to potentially benefit from projected price increases.",
          "Explore quality premium opportunities as protein content demands are increasing.",
          "Consider diversifying into complementary crops to mitigate market risks.",
        ],
        createdAt: new Date().toISOString(),
      })
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading prediction details...</p>
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-800">
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
              className="h-6 w-6 text-red-600 dark:text-red-200"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Prediction Not Found</h2>
          <p className="text-muted-foreground">
            The prediction you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/price-predictor">Back to Price Predictor</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex items-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/price-predictor">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Price Predictor
          </Link>
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{prediction.crop} Price Prediction</CardTitle>
                <CardDescription>
                  {prediction.region} Region • Generated on {new Date(prediction.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-800">
                <LineChart className="h-6 w-6 text-green-600 dark:text-green-200" />
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Predicted Price</p>
                  <p className="text-3xl font-bold">${prediction.predictedPrice.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    {prediction.trend === "up" ? (
                      <>
                        <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                        <p className="text-sm text-green-600">Upward Trend</p>
                      </>
                    ) : (
                      <>
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
                          className="mr-1 h-4 w-4 text-red-600"
                        >
                          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                          <polyline points="16 17 22 17 22 11" />
                        </svg>
                        <p className="text-sm text-red-600">Downward Trend</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Confidence Level</p>
                  <div className="flex items-center justify-end">
                    <p className="text-3xl font-bold">{prediction.confidence}%</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Calendar className="inline mr-1 h-3 w-3" />
                    Generated on {new Date(prediction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Price Trend</p>
                <div className="h-[300px] w-full">
                  <PriceChart data={prediction.historicalPrices} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="insights" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insights">Market Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="insights" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>Key market factors affecting {prediction.crop} prices</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prediction.marketInsights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start">
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
                          className="mr-2 h-5 w-5 text-green-600 flex-shrink-0"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommendations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Strategic recommendations based on our price analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((recommendation: string, index: number) => (
                      <li key={index} className="flex items-start">
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
                          className="mr-2 h-5 w-5 text-green-600 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Key Factors</CardTitle>
              <CardDescription>Factors influencing the price prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prediction.factors.map((factor: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{factor.name}</p>
                      <span className="text-sm font-medium">{factor.impact}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: `${factor.impact}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Related Predictions</CardTitle>
              <CardDescription>Other crops in the same region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">C</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Corn</p>
                      <p className="text-xs text-muted-foreground">{prediction.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$4.25</p>
                    <div className="flex items-center text-xs text-green-600">
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
                        className="mr-1 h-3 w-3"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                      <span>+2.4%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">S</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Soybeans</p>
                      <p className="text-xs text-muted-foreground">{prediction.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$12.75</p>
                    <div className="flex items-center text-xs text-green-600">
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
                        className="mr-1 h-3 w-3"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                      <span>+1.8%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">B</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Barley</p>
                      <p className="text-xs text-muted-foreground">{prediction.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$5.50</p>
                    <div className="flex items-center text-xs text-red-600">
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
                        className="mr-1 h-3 w-3"
                      >
                        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                        <polyline points="16 17 22 17 22 11" />
                      </svg>
                      <span>-0.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/price-predictor">View All Predictions</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

