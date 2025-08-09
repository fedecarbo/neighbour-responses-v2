'use client'

import { useEffect } from "react"
import { useFilters } from "@/context/FilterContext"
import { SentimentType, CommentStatus } from "@shared/types"

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
      commentStatus?: CommentStatus[]
    } = {}
    
    if (searchParams.search) {
      filters.searchText = searchParams.search
    }
    
    if (searchParams.sentiment) {
      filters.sentiment = searchParams.sentiment.split(',').filter(Boolean) as SentimentType[]
    }
    
    if (searchParams.status) {
      filters.commentStatus = searchParams.status.split(',').filter(Boolean) as CommentStatus[]
    }
    
    if (Object.keys(filters).length > 0) {
      updateFilters(filters)
    }
  }, [searchParams, updateFilters])

  // This component doesn't render anything
  return null
}