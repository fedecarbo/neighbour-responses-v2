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

export type CommentTag = 
  | 'Use'
  | 'Privacy' 
  | 'Light'
  | 'Access'
  | 'Noise'
  | 'Traffic'
  | 'Design'
  | 'Other';

export interface NeighborComment {
  id: string;
  applicationId: string;
  name: string;
  surname: string;
  email: string;
  neighborAddress: string;
  coordinates: GeographicCoordinate;
  content: string;
  sentiment: SentimentType;         // 'positive' | 'neutral' | 'negative'
  tags: CommentTag[];               // Tags based on comment content
  submissionDate: Date;
  status: CommentStatus;            // 'pending_review' | 'approved_for_publication' | 'confidential' | 'redacted'
  isRedacted: boolean;              // Visual cue for redacted content
  officerNotes?: string;
  isEdited: boolean;
  originalContent?: string;         // Audit trail for edits
  createdAt: Date;
  updatedAt: Date;
}