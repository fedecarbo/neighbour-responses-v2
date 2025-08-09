/**
 * Filter types for map-list synchronization
 */

import { SentimentType, CommentStatus } from './comments';
import { ApplicationStatus } from './planning';

export interface FilterState {
  sentiment: SentimentType[];
  commentStatus: CommentStatus[];
  applicationStatus: ApplicationStatus[];
  dateRange: {
    start?: Date;
    end?: Date;
  };
  geographicBounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  searchText?: string;
}