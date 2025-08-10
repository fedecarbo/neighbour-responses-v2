/**
 * Neighbor comment types for planning applications
 * Simplified for prototype - Story 1.4
 */

import { GeographicCoordinate } from './spatial';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface NeighborComment {
  id: string;
  neighborAddress: string;
  coordinates: GeographicCoordinate;
  content: string;
  sentiment: SentimentType;
  submissionDate: string;
  officerNotes?: string;
}

// Placeholder type for Story 1.4 prototype
export type CommentTag = 'privacy' | 'noise' | 'traffic' | 'design' | 'general';