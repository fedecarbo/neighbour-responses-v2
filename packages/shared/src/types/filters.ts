/**
 * Filter types for map-list synchronization
 * Simplified for prototype - Story 1.4
 */

import { SentimentType } from './comments';

// Story 1.4: Simplified filter state for prototype
export interface FilterState {
  selectedPins: string[];
  sentimentFilter: SentimentType[];
  searchQuery: string;
  mapBounds?: MapBounds;
  // Extended fields for FilterContext compatibility (prototype only)
  sentiment: SentimentType[];
  searchText?: string;
  // Placeholder fields not implemented for Story 1.4
  commentStatus?: any[];
  applicationStatus?: any[];
  dateRange?: any;
  geographicBounds?: any;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}