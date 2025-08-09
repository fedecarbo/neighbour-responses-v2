/**
 * Neighbor comment types for planning applications
 * Source: architecture/data-models.md#neighborcomment
 */

import { GeographicCoordinate } from './spatial';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export type CommentStatus = 
  | 'pending_review'
  | 'approved_for_publication'
  | 'confidential'
  | 'redacted';

export interface NeighborComment {
  id: string;
  applicationId: string;
  neighborAddress: string;
  coordinates: GeographicCoordinate;
  content: string;
  sentiment: SentimentType;         // 'positive' | 'neutral' | 'negative'
  submissionDate: Date;
  status: CommentStatus;            // 'pending_review' | 'approved_for_publication' | 'confidential' | 'redacted'
  officerNotes?: string;
  isEdited: boolean;
  originalContent?: string;         // Audit trail for edits
  createdAt: Date;
  updatedAt: Date;
}