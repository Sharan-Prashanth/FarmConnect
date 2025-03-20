"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  UserPlus,
  LogIn,
  FileText,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  UserCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export default function UserGuide() {
  const [activeTab, setActiveTab] = useState("signup")

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AgriContract Platform User Guide</h1>
      <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
        Welcome to AgriContract! This guide will help you navigate through our platform and make the most of our
        features.
      </p>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
          <TabsTrigger value="signup" className="flex flex-col items-center gap-1 py-2 h-auto">
            <UserPlus className="h-4 w-4" />
            <span className="text-xs">Sign Up</span>
          </TabsTrigger>
          <TabsTrigger value="login" className="flex flex-col items-center gap-1 py-2 h-auto">
            <LogIn className="h-4 w-4" />
            <span className="text-xs">Login</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex flex-col items-center gap-1 py-2 h-auto">
            <FileText className="h-4 w-4" />
            <span className="text-xs">Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex flex-col items-center gap-1 py-2 h-auto">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs">Marketplace</span>
          </TabsTrigger>
          <TabsTrigger value="negotiation" className="flex flex-col items-center gap-1 py-2 h-auto">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">Negotiation</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex flex-col items-center gap-1 py-2 h-auto">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2 h-auto">
            <UserCircle className="h-4 w-4" />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex flex-col items-center gap-1 py-2 h-auto">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">Verification</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-600" />
                Creating an Account
              </CardTitle>
              <CardDescription>Follow these steps to create your AgriContract account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Step 1: Navigate to the Sign Up page</h3>
                <p className="text-muted-foreground">
                  Click on the "Sign Up" button in the top navigation bar of the website.
                </p>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> You can also access the sign-up page directly at{" "}
                    <span className="font-mono text-xs bg-muted p-1 rounded">https://agricontract.com/signup</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 2: Fill in your personal information</h3>
                <p className="text-muted-foreground">Complete all required fields in the sign-up form:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Full Name (as it appears on your official documents)</li>
                  <li>Email Address (you'll need to verify this later)</li>
                  <li>Phone Number (with country code)</li>
                  <li>Password (must be at least 8 characters with a mix of letters, numbers, and symbols)</li>
                  <li>Address (your primary business or residence address)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 3: Select your user role</h3>
                <p className="text-muted-foreground">Choose the appropriate role that best describes you:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>
                    <strong>Farmer:</strong> If you grow crops and want to sell them or enter into farming contracts
                  </li>
                  <li>
                    <strong>Buyer:</strong> If you purchase agricultural products from farmers
                  </li>
                  <li>
                    <strong>Agent:</strong> If you facilitate transactions between farmers and buyers
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 4: Create your account</h3>
                <p className="text-muted-foreground">
                  Click the "Create Account" button to submit your information. You'll be redirected to the verification
                  page.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-green-600" />
                Logging Into Your Account
              </CardTitle>
              <CardDescription>Access your AgriContract dashboard by logging in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Step 1: Navigate to the Login page</h3>
                <p className="text-muted-foreground">
                  Click on the "Login" button in the top navigation bar of the website.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 2: Enter your credentials</h3>
                <p className="text-muted-foreground">
                  Enter your registered email address and password in the respective fields.
                </p>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> If you've forgotten your password, click on the "Forgot password?" link to
                    reset it.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 3: Access your dashboard</h3>
                <p className="text-muted-foreground">
                  After successful login, you'll be redirected to your personalized dashboard based on your user role.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Creating and Managing Contracts
              </CardTitle>
              <CardDescription>Learn how to create, view, and manage farming contracts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Creating a New Contract</h3>
                <ol className="list-decimal pl-5 space-y-3 text-muted-foreground">
                  <li>
                    <p className="font-medium text-foreground">Navigate to Contract Creation</p>
                    <p>From your dashboard, click on "Contracts" in the sidebar, then select "Create New Contract".</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">Fill in Contract Details</p>
                    <p>Complete all required fields in the contract form:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Contract Title</li>
                      <li>Contract Type (Fixed Price, Revenue Sharing, etc.)</li>
                      <li>Start and End Dates</li>
                      <li>Crop Details (Type, Quantity, Quality Standards)</li>
                      <li>Price Information</li>
                      <li>Payment Terms</li>
                      <li>Delivery Schedule</li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">Add Special Clauses (Optional)</p>
                    <p>Include any special terms or conditions specific to your agreement.</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">Review and Submit</p>
                    <p>Carefully review all contract details before clicking "Create Contract".</p>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Viewing and Managing Contracts</h3>
                <p className="text-muted-foreground">To view your existing contracts:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Go to "Contracts" "-"" "Contract List" in the sidebar</li>
                  <li>Use filters to sort contracts by status, date, or type</li>
                  <li>Click on any contract to view its details</li>
                  <li>
                    From the contract details page, you can:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Download the contract document</li>
                      <li>View contract timeline and history</li>
                      <li>Amend the contract (if permitted)</li>
                      <li>Terminate the contract (if necessary)</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-green-600" />
                Using the Marketplace
              </CardTitle>
              <CardDescription>Browse, create, and respond to marketplace listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Browsing the Marketplace</h3>
                <p className="text-muted-foreground">To browse available listings:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Click on "Marketplace" in the main navigation</li>
                  <li>
                    Use filters to narrow down listings by:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Crop type</li>
                      <li>Location</li>
                      <li>Price range</li>
                      <li>Quantity</li>
                    </ul>
                  </li>
                  <li>Click on any listing card to view detailed information</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Creating a Marketplace Listing</h3>
                <p className="text-muted-foreground">To create a new listing:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>From the Marketplace page, click "Create Listing"</li>
                  <li>
                    Fill in all required information:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Listing title</li>
                      <li>Product description</li>
                      <li>Crop details (type, variety, certification)</li>
                      <li>Quantity available</li>
                      <li>Price per unit</li>
                      <li>Location</li>
                      <li>Availability dates</li>
                    </ul>
                  </li>
                  <li>Upload product images (recommended)</li>
                  <li>Add any certifications or quality documents</li>
                  <li>Review and click "Publish Listing"</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Responding to Listings</h3>
                <p className="text-muted-foreground">When you find a listing you're interested in:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Click "View Details" on the listing card</li>
                  <li>Review all information on the detailed listing page</li>
                  <li>
                    You can:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Click "Contact Seller" to send a message</li>
                      <li>Click "Negotiate" to propose different terms</li>
                      <li>Click "View Document" to see any attached documents</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negotiation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                Negotiating Terms
              </CardTitle>
              <CardDescription>How to negotiate prices and terms with other users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Starting a Negotiation</h3>
                <p className="text-muted-foreground">To negotiate on a marketplace listing:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Find a listing you're interested in</li>
                  <li>Click the "Negotiate" button on the listing card or detail page</li>
                  <li>
                    In the negotiation modal that appears:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>View the current price and quantity</li>
                      <li>Enter your proposed price per unit</li>
                      <li>Enter your proposed quantity</li>
                      <li>Provide a reason for your negotiation (important for successful negotiations)</li>
                    </ul>
                  </li>
                  <li>Review the total value comparison</li>
                  <li>Click "Send Proposal" to submit your negotiation</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Responding to Negotiations</h3>
                <p className="text-muted-foreground">When someone negotiates on your listing:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>You'll receive a notification in your dashboard</li>
                  <li>Go to "Negotiations" in the sidebar</li>
                  <li>
                    Review the negotiation details including:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Original terms</li>
                      <li>Proposed terms</li>
                      <li>The buyer's reason for negotiation</li>
                    </ul>
                  </li>
                  <li>
                    You can:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Accept the proposal as-is</li>
                      <li>Reject the proposal</li>
                      <li>Counter-offer with different terms</li>
                      <li>Message the buyer for clarification</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Finalizing a Negotiation</h3>
                <p className="text-muted-foreground">Once both parties agree on terms:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>The seller accepts the final proposal</li>
                  <li>A contract is automatically generated with the agreed terms</li>
                  <li>Both parties receive the contract for review</li>
                  <li>After both parties sign, the transaction is created in the system</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> Always be clear and specific about your requirements during negotiation.
                    Providing context for your proposed changes increases the likelihood of acceptance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Managing Transactions
              </CardTitle>
              <CardDescription>Track, process, and complete financial transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Viewing Your Transactions</h3>
                <p className="text-muted-foreground">To access your transaction history:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Click on "Transactions" in the sidebar</li>
                  <li>
                    Use the tabs to filter between:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>"All Transactions" - Complete overview</li>
                      <li>"Incoming" - Payments you're receiving</li>
                      <li>"Outgoing" - Payments you're making</li>
                    </ul>
                  </li>
                  <li>
                    Use additional filters to sort by:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Date range</li>
                      <li>Status (Pending, Completed, Failed)</li>
                      <li>Amount</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Processing a Transaction</h3>
                <p className="text-muted-foreground">To process a pending transaction:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Find the transaction in your list</li>
                  <li>Click the "View" button to see transaction details</li>
                  <li>
                    Review all information including:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Transaction amount</li>
                      <li>Related contract</li>
                      <li>Payment terms</li>
                      <li>Timeline</li>
                    </ul>
                  </li>
                  <li>Click "Process" or "Confirm" button</li>
                  <li>In the confirmation modal, verify details and click "Complete Transaction"</li>
                  <li>The transaction status will update to "Completed"</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Transaction Receipts and Documentation</h3>
                <p className="text-muted-foreground">For record-keeping and compliance:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>After a transaction is completed, click "View" on the transaction</li>
                  <li>Click "Download Receipt" to get a PDF receipt</li>
                  <li>
                    The receipt includes:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Transaction ID</li>
                      <li>Date and time</li>
                      <li>Parties involved</li>
                      <li>Amount and currency</li>
                      <li>Related contract reference</li>
                      <li>Payment method</li>
                    </ul>
                  </li>
                  <li>Store this receipt for your accounting and tax records</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Important:</strong> All transactions are recorded on the blockchain for transparency and
                    security. Transaction records cannot be altered once completed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-green-600" />
                Managing Your Profile
              </CardTitle>
              <CardDescription>Update your information and manage account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Accessing Your Profile</h3>
                <p className="text-muted-foreground">To view and edit your profile:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Click on your profile picture in the top-right corner</li>
                  <li>Select "Profile" from the dropdown menu</li>
                  <li>Alternatively, click on "Profile" in the sidebar</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Updating Personal Information</h3>
                <p className="text-muted-foreground">To update your profile details:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>On your profile page, click the "Edit Profile" button</li>
                  <li>
                    Update any of the following information:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Profile picture</li>
                      <li>Name</li>
                      <li>Contact information</li>
                      <li>Address</li>
                      <li>Business details</li>
                    </ul>
                  </li>
                  <li>Click "Save Changes" to update your profile</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Note:</strong> Some information may require verification if changed, especially details used
                    for identity verification.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Security Settings</h3>
                <p className="text-muted-foreground">To manage your account security:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>On your profile page, go to the "Settings" tab</li>
                  <li>
                    Under "Security", you can:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Change your password</li>
                      <li>Enable/disable two-factor authentication</li>
                      <li>View login history</li>
                      <li>Manage connected devices</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Notification Preferences</h3>
                <p className="text-muted-foreground">To customize your notifications:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>On your profile page, go to the "Settings" tab</li>
                  <li>
                    Under "Notifications", you can toggle notifications for:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>New contract proposals</li>
                      <li>Marketplace messages</li>
                      <li>Transaction updates</li>
                      <li>Price alerts</li>
                      <li>System announcements</li>
                    </ul>
                  </li>
                  <li>Choose your preferred notification methods (email, SMS, in-app)</li>
                  <li>Click "Save Preferences" to update your settings</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Account Verification
              </CardTitle>
              <CardDescription>Complete the verification process to unlock all platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Why Verification is Important</h3>
                <p className="text-muted-foreground">Account verification helps:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Establish trust between users on the platform</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with regulatory requirements</li>
                  <li>Unlock advanced features and higher transaction limits</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Document Verification</h3>
                <p className="text-muted-foreground">To verify your business documents:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Go to the "Verification" page after signup</li>
                  <li>Select the "Documents" tab</li>
                  <li>
                    Upload the following documents:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Business License/Registration</li>
                      <li>Tax Certificate</li>
                      <li>Bank Statement (not older than 3 months)</li>
                    </ul>
                  </li>
                  <li>
                    Ensure all documents are:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Clear and legible</li>
                      <li>Complete (no cut-off information)</li>
                      <li>Valid and not expired</li>
                    </ul>
                  </li>
                  <li>Click "Submit Documents" to proceed</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Identity Verification</h3>
                <p className="text-muted-foreground">To verify your personal identity:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Go to the "Verification" page</li>
                  <li>Select the "Identity" tab</li>
                  <li>
                    Upload the following:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Government-issued ID (passport, driver's license, or national ID)</li>
                      <li>Proof of address (utility bill, bank statement)</li>
                      <li>Selfie with your ID (follow the instructions on screen)</li>
                    </ul>
                  </li>
                  <li>Click "Verify Identity" to submit</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Privacy Note:</strong> All your verification documents are encrypted and stored securely.
                    They are only used for verification purposes and are not shared with other users.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Verification Status</h3>
                <p className="text-muted-foreground">After submitting your documents:</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Your verification status will show as "Pending"</li>
                  <li>Our team will review your documents within 1-2 business days</li>
                  <li>You'll receive an email notification once verification is complete</li>
                  <li>If there are any issues, you'll be notified with instructions on what to correct</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Verification Levels</h3>
                <p className="text-muted-foreground">AgriContract has three verification levels:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <p className="font-medium text-foreground">Level 1: Basic</p>
                    <p>Email and phone verification. Limited access to platform features.</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">Level 2: Standard</p>
                    <p>
                      Identity verification complete. Access to most platform features with moderate transaction limits.
                    </p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">Level 3: Advanced</p>
                    <p>
                      Full business and document verification. Unlimited access to all features with highest transaction
                      limits.
                    </p>
                  </li>
                </ul>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> Complete all verification steps as soon as possible to ensure seamless access
                    to all platform features when you need them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-10">
        <Button
          onClick={() => {
            const nextTab = {
              signup: "login",
              login: "contracts",
              contracts: "marketplace",
              marketplace: "negotiation",
              negotiation: "transactions",
              transactions: "profile",
              profile: "verification",
              verification: "signup",
            }[activeTab]
            setActiveTab(nextTab as string)
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          Next Section
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

