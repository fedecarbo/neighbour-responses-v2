'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { FilterState } from '@shared/types'

// Filter Actions
type FilterAction =
  | { type: 'SET_SENTIMENT_FILTER'; payload: FilterState['sentiment'] }
  | { type: 'SET_COMMENT_STATUS_FILTER'; payload: FilterState['commentStatus'] }
  | { type: 'SET_APPLICATION_STATUS_FILTER'; payload: FilterState['applicationStatus'] }
  | { type: 'SET_DATE_RANGE'; payload: FilterState['dateRange'] }
  | { type: 'SET_GEOGRAPHIC_BOUNDS'; payload: FilterState['geographicBounds'] }
  | { type: 'SET_SEARCH_TEXT'; payload: string | undefined }
  | { type: 'RESET_FILTERS' }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }

// Initial filter state
const initialFilterState: FilterState = {
  // Story 1.4 core fields
  selectedPins: [],
  sentimentFilter: [],
  searchQuery: '',
  mapBounds: undefined,
  // Extended fields for compatibility
  sentiment: [],
  searchText: undefined,
  commentStatus: [],
  applicationStatus: [],
  dateRange: {},
  geographicBounds: undefined,
}

// Filter reducer
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SENTIMENT_FILTER':
      return { ...state, sentiment: action.payload }
    case 'SET_COMMENT_STATUS_FILTER':
      return { ...state, commentStatus: action.payload }
    case 'SET_APPLICATION_STATUS_FILTER':
      return { ...state, applicationStatus: action.payload }
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload }
    case 'SET_GEOGRAPHIC_BOUNDS':
      return { ...state, geographicBounds: action.payload }
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload }
    case 'UPDATE_FILTERS':
      return { ...state, ...action.payload }
    case 'RESET_FILTERS':
      return initialFilterState
    default:
      return state
  }
}

// Context type
interface FilterContextType {
  filters: FilterState
  dispatch: React.Dispatch<FilterAction>
  updateFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Provider component
interface FilterProviderProps {
  children: ReactNode
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState)

  const updateFilters = (newFilters: Partial<FilterState>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: newFilters })
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  const value = {
    filters,
    dispatch,
    updateFilters,
    resetFilters,
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

// Hook to use filter context
export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}