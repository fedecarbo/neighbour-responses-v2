'use client'

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AppLayoutProps {
  children: React.ReactNode
  applicationId: string
  activeTab: "dashboard" | "comments"
  onTabChange: (value: string) => void
}

export function AppLayout({ children, applicationId, activeTab, onTabChange }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Planning Application {applicationId}</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Review and analyze neighbor responses for this planning application
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10 sm:h-12">
            <TabsTrigger 
              value="dashboard" 
              className="text-sm sm:text-base px-2 sm:px-3"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="comments" 
              className="text-sm sm:text-base px-2 sm:px-3"
            >
              Comments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-4 sm:mt-6">
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}