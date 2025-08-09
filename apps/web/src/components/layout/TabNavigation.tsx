'use client'

import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { AppLayout } from "./AppLayout"
import { useTabNavigation } from "@/context/TabNavigationContext"
import { useFilters } from "@/context/FilterContext"

interface TabNavigationProps {
  children: React.ReactNode
  applicationId: string
  activeTab: "dashboard" | "comments"
}

export function TabNavigation({ children, applicationId, activeTab }: TabNavigationProps) {
  const router = useRouter()
  const { setCurrentTab, setApplicationId } = useTabNavigation()
  const { filters } = useFilters()

  // Update context when props change
  useEffect(() => {
    setCurrentTab(activeTab)
    setApplicationId(applicationId)
  }, [activeTab, applicationId, setCurrentTab, setApplicationId])

  const handleTabChange = useCallback((value: string) => {
    const newPath = `/${value}/${applicationId}`
    
    // Add URL parameters to preserve filter state
    const searchParams = new URLSearchParams()
    if (filters.searchText) {
      searchParams.set('search', filters.searchText)
    }
    if (filters.sentiment.length > 0) {
      searchParams.set('sentiment', filters.sentiment.join(','))
    }
    if (filters.commentStatus.length > 0) {
      searchParams.set('status', filters.commentStatus.join(','))
    }
    
    const fullPath = searchParams.toString() 
      ? `${newPath}?${searchParams.toString()}`
      : newPath
    
    router.push(fullPath)
  }, [applicationId, router, filters])

  return (
    <AppLayout 
      applicationId={applicationId} 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
    >
      {children}
    </AppLayout>
  )
}