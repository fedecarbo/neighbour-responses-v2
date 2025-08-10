'use client'

import { useEffect } from "react"
import { useFilters } from "@/context/FilterContext"
import { SentimentType } from "@shared/types"
// CommentStatus not implemented for Story 1.4 prototype

interface FilterStateLoaderProps {
  searchParams: {
    search?: string
    sentiment?: string
    status?: string
  }
}

export function FilterStateLoader({ searchParams }: FilterStateLoaderProps) {
  const { updateFilters } = useFilters()

  useEffect(() => {
    const filters: {
      searchText?: string
      sentiment?: SentimentType[]
      // commentStatus?: CommentStatus[] // Not implemented for Story 1.4 prototype
    } = {}
    
    if (searchParams.search) {
      filters.searchText = searchParams.search
    }
    
    if (searchParams.sentiment) {
      filters.sentiment = searchParams.sentiment.split(',').filter(Boolean) as SentimentType[]
    }
    
    if (searchParams.status) {
      // filters.commentStatus = searchParams.status.split(',').filter(Boolean) as CommentStatus[] // Not implemented
    }
    
    if (Object.keys(filters).length > 0) {
      updateFilters(filters)
    }
  }, [searchParams, updateFilters])

  // This component doesn't render anything
  return null
}