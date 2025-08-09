'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

type TabType = 'dashboard' | 'comments'

interface TabNavigationState {
  currentTab: TabType
  applicationId: string
  preserveFilters: boolean
}

interface TabNavigationContextType {
  state: TabNavigationState
  setCurrentTab: (tab: TabType) => void
  setApplicationId: (id: string) => void
  setPreserveFilters: (preserve: boolean) => void
}

const TabNavigationContext = createContext<TabNavigationContextType | undefined>(undefined)

interface TabNavigationProviderProps {
  children: ReactNode
  initialTab?: TabType
  initialApplicationId?: string
}

export function TabNavigationProvider({ 
  children, 
  initialTab = 'dashboard',
  initialApplicationId = ''
}: TabNavigationProviderProps) {
  const [state, setState] = useState<TabNavigationState>({
    currentTab: initialTab,
    applicationId: initialApplicationId,
    preserveFilters: true
  })

  const setCurrentTab = useCallback((tab: TabType) => {
    setState(prev => ({ ...prev, currentTab: tab }))
  }, [])

  const setApplicationId = useCallback((id: string) => {
    setState(prev => ({ ...prev, applicationId: id }))
  }, [])

  const setPreserveFilters = useCallback((preserve: boolean) => {
    setState(prev => ({ ...prev, preserveFilters: preserve }))
  }, [])

  const value = {
    state,
    setCurrentTab,
    setApplicationId,
    setPreserveFilters
  }

  return (
    <TabNavigationContext.Provider value={value}>
      {children}
    </TabNavigationContext.Provider>
  )
}

export function useTabNavigation() {
  const context = useContext(TabNavigationContext)
  if (context === undefined) {
    throw new Error('useTabNavigation must be used within a TabNavigationProvider')
  }
  return context
}