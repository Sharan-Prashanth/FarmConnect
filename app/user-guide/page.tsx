"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { useLanguage } from "@/context/language-context"
import { LanguageSelector } from "@/components/language-selector"

export default function Page() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("signup")

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">{t("guide.title")}</h1>
      <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">{t("guide.welcome")}</p>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
          <TabsTrigger value="signup" className="flex flex-col items-center gap-1 py-2 h-auto">
            <UserPlus className="h-4 w-4" />
            <span className="text-xs">{t("tab.signup")}</span>
          </TabsTrigger>
          <TabsTrigger value="login" className="flex flex-col items-center gap-1 py-2 h-auto">
            <LogIn className="h-4 w-4" />
            <span className="text-xs">{t("tab.login")}</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex flex-col items-center gap-1 py-2 h-auto">
            <FileText className="h-4 w-4" />
            <span className="text-xs">{t("tab.contracts")}</span>
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex flex-col items-center gap-1 py-2 h-auto">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs">{t("tab.marketplace")}</span>
          </TabsTrigger>
          <TabsTrigger value="negotiation" className="flex flex-col items-center gap-1 py-2 h-auto">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{t("tab.negotiation")}</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex flex-col items-center gap-1 py-2 h-auto">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">{t("tab.transactions")}</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2 h-auto">
            <UserCircle className="h-4 w-4" />
            <span className="text-xs">{t("tab.profile")}</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex flex-col items-center gap-1 py-2 h-auto">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">{t("tab.verification")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-600" />
                {t("signup.title")}
              </CardTitle>
              <CardDescription>{t("signup.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("signup.step1.title")}</h3>
                <p className="text-muted-foreground">{t("signup.step1.description")}</p>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> {t("signup.step1.tip")}{" "}
                    <span className="font-mono text-xs bg-muted p-1 rounded">https://agricontract.com/signup</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("signup.step2.title")}</h3>
                <p className="text-muted-foreground">{t("signup.step2.description")}</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>{t("signup.step2.field1")}</li>
                  <li>{t("signup.step2.field2")}</li>
                  <li>{t("signup.step2.field3")}</li>
                  <li>{t("signup.step2.field4")}</li>
                  <li>{t("signup.step2.field5")}</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("signup.step3.title")}</h3>
                <p className="text-muted-foreground">{t("signup.step3.description")}</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>
                    <strong>{t("signup.step3.role1.title")}</strong> {t("signup.step3.role1.description")}
                  </li>
                  <li>
                    <strong>{t("signup.step3.role2.title")}</strong> {t("signup.step3.role2.description")}
                  </li>
                  <li>
                    <strong>{t("signup.step3.role3.title")}</strong> {t("signup.step3.role3.description")}
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("signup.step4.title")}</h3>
                <p className="text-muted-foreground">{t("signup.step4.description")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="login" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-green-600" />
                {t("login.title")}
              </CardTitle>
              <CardDescription>{t("login.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("login.step1.title")}</h3>
                <p className="text-muted-foreground">{t("login.step1.description")}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("login.step2.title")}</h3>
                <p className="text-muted-foreground">{t("login.step2.description")}</p>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> {t("login.step2.tip")}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("login.step3.title")}</h3>
                <p className="text-muted-foreground">{t("login.step3.description")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                {t("contracts.title")}
              </CardTitle>
              <CardDescription>{t("contracts.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("contracts.create.title")}</h3>
                <ol className="list-decimal pl-5 space-y-3 text-muted-foreground">
                  <li>
                    <p className="font-medium text-foreground">{t("contracts.create.step1.title")}</p>
                    <p>{t("contracts.create.step1.description")}</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">{t("contracts.create.step2.title")}</p>
                    <p>{t("contracts.create.step2.description")}</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("contracts.create.step2.field1")}</li>
                      <li>{t("contracts.create.step2.field2")}</li>
                      <li>{t("contracts.create.step2.field3")}</li>
                      <li>{t("contracts.create.step2.field4")}</li>
                      <li>{t("contracts.create.step2.field5")}</li>
                      <li>{t("contracts.create.step2.field6")}</li>
                      <li>{t("contracts.create.step2.field7")}</li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">{t("contracts.create.step3.title")}</p>
                    <p>{t("contracts.create.step3.description")}</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">{t("contracts.create.step4.title")}</p>
                    <p>{t("contracts.create.step4.description")}</p>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("contracts.manage.title")}</h3>
                <p className="text-muted-foreground">{t("contracts.manage.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("contracts.manage.step1")}</li>
                  <li>{t("contracts.manage.step2")}</li>
                  <li>{t("contracts.manage.step3")}</li>
                  <li>
                    {t("contracts.manage.step4")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("contracts.manage.step4.action1")}</li>
                      <li>{t("contracts.manage.step4.action2")}</li>
                      <li>{t("contracts.manage.step4.action3")}</li>
                      <li>{t("contracts.manage.step4.action4")}</li>
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
                {t("marketplace.title")}
              </CardTitle>
              <CardDescription>{t("marketplace.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("marketplace.browse.title")}</h3>
                <p className="text-muted-foreground">{t("marketplace.browse.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("marketplace.browse.step1")}</li>
                  <li>
                    {t("marketplace.browse.step2")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("marketplace.browse.filter1")}</li>
                      <li>{t("marketplace.browse.filter2")}</li>
                      <li>{t("marketplace.browse.filter3")}</li>
                      <li>{t("marketplace.browse.filter4")}</li>
                    </ul>
                  </li>
                  <li>{t("marketplace.browse.step3")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("marketplace.create.title")}</h3>
                <p className="text-muted-foreground">{t("marketplace.create.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("marketplace.create.step1")}</li>
                  <li>
                    {t("marketplace.create.step2")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("marketplace.create.field1")}</li>
                      <li>{t("marketplace.create.field2")}</li>
                      <li>{t("marketplace.create.field3")}</li>
                      <li>{t("marketplace.create.field4")}</li>
                      <li>{t("marketplace.create.field5")}</li>
                      <li>{t("marketplace.create.field6")}</li>
                      <li>{t("marketplace.create.field7")}</li>
                    </ul>
                  </li>
                  <li>{t("marketplace.create.step3")}</li>
                  <li>{t("marketplace.create.step4")}</li>
                  <li>{t("marketplace.create.step5")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("marketplace.respond.title")}</h3>
                <p className="text-muted-foreground">{t("marketplace.respond.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("marketplace.respond.step1")}</li>
                  <li>{t("marketplace.respond.step2")}</li>
                  <li>
                    {t("marketplace.respond.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("marketplace.respond.action1")}</li>
                      <li>{t("marketplace.respond.action2")}</li>
                      <li>{t("marketplace.respond.action3")}</li>
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
                {t("negotiation.title")}
              </CardTitle>
              <CardDescription>{t("negotiation.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("negotiation.start.title")}</h3>
                <p className="text-muted-foreground">{t("negotiation.start.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("negotiation.start.step1")}</li>
                  <li>{t("negotiation.start.step2")}</li>
                  <li>
                    {t("negotiation.start.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("negotiation.start.field1")}</li>
                      <li>{t("negotiation.start.field2")}</li>
                      <li>{t("negotiation.start.field3")}</li>
                      <li>{t("negotiation.start.field4")}</li>
                    </ul>
                  </li>
                  <li>{t("negotiation.start.step4")}</li>
                  <li>{t("negotiation.start.step5")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("negotiation.respond.title")}</h3>
                <p className="text-muted-foreground">{t("negotiation.respond.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("negotiation.respond.step1")}</li>
                  <li>{t("negotiation.respond.step2")}</li>
                  <li>
                    {t("negotiation.respond.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("negotiation.respond.detail1")}</li>
                      <li>{t("negotiation.respond.detail2")}</li>
                      <li>{t("negotiation.respond.detail3")}</li>
                    </ul>
                  </li>
                  <li>
                    {t("negotiation.respond.step4")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("negotiation.respond.action1")}</li>
                      <li>{t("negotiation.respond.action2")}</li>
                      <li>{t("negotiation.respond.action3")}</li>
                      <li>{t("negotiation.respond.action4")}</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("negotiation.finalize.title")}</h3>
                <p className="text-muted-foreground">{t("negotiation.finalize.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("negotiation.finalize.step1")}</li>
                  <li>{t("negotiation.finalize.step2")}</li>
                  <li>{t("negotiation.finalize.step3")}</li>
                  <li>{t("negotiation.finalize.step4")}</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>Tip:</strong> {t("negotiation.finalize.tip")}
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
                {t("transactions.title")}
              </CardTitle>
              <CardDescription>{t("transactions.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("transactions.view.title")}</h3>
                <p className="text-muted-foreground">{t("transactions.view.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("transactions.view.step1")}</li>
                  <li>
                    {t("transactions.view.step2")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("transactions.view.filter1")}</li>
                      <li>{t("transactions.view.filter2")}</li>
                      <li>{t("transactions.view.filter3")}</li>
                    </ul>
                  </li>
                  <li>
                    {t("transactions.view.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("transactions.view.sort1")}</li>
                      <li>{t("transactions.view.sort2")}</li>
                      <li>{t("transactions.view.sort3")}</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("transactions.process.title")}</h3>
                <p className="text-muted-foreground">{t("transactions.process.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("transactions.process.step1")}</li>
                  <li>{t("transactions.process.step2")}</li>
                  <li>
                    {t("transactions.process.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("transactions.process.detail1")}</li>
                      <li>{t("transactions.process.detail2")}</li>
                      <li>{t("transactions.process.detail3")}</li>
                      <li>{t("transactions.process.detail4")}</li>
                    </ul>
                  </li>
                  <li>{t("transactions.process.step4")}</li>
                  <li>{t("transactions.process.step5")}</li>
                  <li>{t("transactions.process.step6")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("transactions.receipt.title")}</h3>
                <p className="text-muted-foreground">{t("transactions.receipt.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("transactions.receipt.step1")}</li>
                  <li>{t("transactions.receipt.step2")}</li>
                  <li>
                    {t("transactions.receipt.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("transactions.receipt.field1")}</li>
                      <li>{t("transactions.receipt.field2")}</li>
                      <li>{t("transactions.receipt.field3")}</li>
                      <li>{t("transactions.receipt.field4")}</li>
                      <li>{t("transactions.receipt.field5")}</li>
                      <li>{t("transactions.receipt.field6")}</li>
                    </ul>
                  </li>
                  <li>{t("transactions.receipt.step4")}</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>{t("transactions.receipt.important")}</strong>
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
                {t("profile.title")}
              </CardTitle>
              <CardDescription>{t("profile.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("profile.access.title")}</h3>
                <p className="text-muted-foreground">{t("profile.access.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("profile.access.step1")}</li>
                  <li>{t("profile.access.step2")}</li>
                  <li>{t("profile.access.step3")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("profile.update.title")}</h3>
                <p className="text-muted-foreground">{t("profile.update.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("profile.update.step1")}</li>
                  <li>
                    {t("profile.update.step2")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("profile.update.field1")}</li>
                      <li>{t("profile.update.field2")}</li>
                      <li>{t("profile.update.field3")}</li>
                      <li>{t("profile.update.field4")}</li>
                      <li>{t("profile.update.field5")}</li>
                    </ul>
                  </li>
                  <li>{t("profile.update.step3")}</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>{t("profile.update.note")}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("profile.security.title")}</h3>
                <p className="text-muted-foreground">{t("profile.security.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("profile.security.step1")}</li>
                  <li>
                    {t("profile.security.step2")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("profile.security.action1")}</li>
                      <li>{t("profile.security.action2")}</li>
                      <li>{t("profile.security.action3")}</li>
                      <li>{t("profile.security.action4")}</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("profile.notification.title")}</h3>
                <p className="text-muted-foreground">{t("profile.notification.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("profile.notification.step1")}</li>
                  <li>
                    {t("profile.notification.step2")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("profile.notification.option1")}</li>
                      <li>{t("profile.notification.option2")}</li>
                      <li>{t("profile.notification.option3")}</li>
                      <li>{t("profile.notification.option4")}</li>
                      <li>{t("profile.notification.option5")}</li>
                    </ul>
                  </li>
                  <li>{t("profile.notification.step3")}</li>
                  <li>{t("profile.notification.step4")}</li>
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
                {t("verification.title")}
              </CardTitle>
              <CardDescription>{t("verification.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">{t("verification.importance.title")}</h3>
                <p className="text-muted-foreground">{t("verification.importance.description")}</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>{t("verification.importance.reason1")}</li>
                  <li>{t("verification.importance.reason2")}</li>
                  <li>{t("verification.importance.reason3")}</li>
                  <li>{t("verification.importance.reason4")}</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("verification.document.title")}</h3>
                <p className="text-muted-foreground">{t("verification.document.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("verification.document.step1")}</li>
                  <li>{t("verification.document.step2")}</li>
                  <li>
                    {t("verification.document.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("verification.document.doc1")}</li>
                      <li>{t("verification.document.doc2")}</li>
                      <li>{t("verification.document.doc3")}</li>
                    </ul>
                  </li>
                  <li>
                    {t("verification.document.step4")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("verification.document.req1")}</li>
                      <li>{t("verification.document.req2")}</li>
                      <li>{t("verification.document.req3")}</li>
                    </ul>
                  </li>
                  <li>{t("verification.document.step5")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("verification.identity.title")}</h3>
                <p className="text-muted-foreground">{t("verification.identity.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("verification.identity.step1")}</li>
                  <li>{t("verification.identity.step2")}</li>
                  <li>
                    {t("verification.identity.step3")}
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>{t("verification.identity.id1")}</li>
                      <li>{t("verification.identity.id2")}</li>
                      <li>{t("verification.identity.id3")}</li>
                    </ul>
                  </li>
                  <li>{t("verification.identity.step4")}</li>
                </ol>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>{t("verification.identity.privacy")}</strong>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("verification.status.title")}</h3>
                <p className="text-muted-foreground">{t("verification.status.description")}</p>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>{t("verification.status.step1")}</li>
                  <li>{t("verification.status.step2")}</li>
                  <li>{t("verification.status.step3")}</li>
                  <li>{t("verification.status.step4")}</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">{t("verification.levels.title")}</h3>
                <p className="text-muted-foreground">{t("verification.levels.description")}</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <p className="font-medium text-foreground">{t("verification.levels.level1.title")}</p>
                    <p>{t("verification.levels.level1.description")}</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">{t("verification.levels.level2.title")}</p>
                    <p>{t("verification.levels.level2.description")}</p>
                  </li>
                  <li>
                    <p className="font-medium text-foreground">{t("verification.levels.level3.title")}</p>
                    <p>{t("verification.levels.level3.description")}</p>
                  </li>
                </ul>
                <div className="rounded-md border p-4 bg-muted/50">
                  <p className="text-sm">
                    <strong>{t("verification.levels.tip")}</strong>
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
          {t("guide.next")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

