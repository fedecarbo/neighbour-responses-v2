import { useFilters } from '@/context/FilterContext'
import { FilterState } from '@shared/types'

/**
 * Custom hook for filter state management
 * Provides centralized filter operations for bi-directional map-list synchronization
 */
export function useFilterState() {
  const { filters, dispatch, updateFilters, resetFilters } = useFilters()

  // Individual filter setters
  const setSentimentFilter = (sentiment: FilterState['sentiment']) => {
    dispatch({ type: 'SET_SENTIMENT_FILTER', payload: sentiment })
  }

  const setCommentStatusFilter = (commentStatus: FilterState['commentStatus']) => {
    dispatch({ type: 'SET_COMMENT_STATUS_FILTER', payload: commentStatus })
  }

  const setApplicationStatusFilter = (applicationStatus: FilterState['applicationStatus']) => {
    dispatch({ type: 'SET_APPLICATION_STATUS_FILTER', payload: applicationStatus })
  }

  const setDateRange = (dateRange: FilterState['dateRange']) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: dateRange })
  }

  const setGeographicBounds = (bounds: FilterState['geographicBounds']) => {
    dispatch({ type: 'SET_GEOGRAPHIC_BOUNDS', payload: bounds })
  }

  const setSearchText = (searchText: string | undefined) => {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchText })
  }

  // Check if filters are active
  const hasActiveFilters = () => {
    return (
      filters.sentiment.length > 0 ||
      filters.commentStatus.length > 0 ||
      filters.applicationStatus.length > 0 ||
      !!filters.searchText ||
      !!filters.geographicBounds ||
      !!filters.dateRange.start ||
      !!filters.dateRange.end
    )
  }

  return {
    filters,
    setSentimentFilter,
    setCommentStatusFilter,
    setApplicationStatusFilter,
    setDateRange,
    setGeographicBounds,
    setSearchText,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  }
}