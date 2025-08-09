/**
 * Planning application types for UK local authorities
 * Source: architecture/data-models.md#planningapplication
 */

import { GeographicCoordinate } from './spatial';
import { NeighborComment } from './comments';

export type ApplicationStatus = 
  | 'submitted'
  | 'under_review'
  | 'consultation'
  | 'approved'
  | 'rejected'
  | 'withdrawn';

export interface PlanningApplication {
  id: string;               // Unique identifier (e.g., "APP/2024/0123")
  reference: string;        // Planning authority reference number
  address: string;          // Application site address
  description: string;      // Development description
  applicantName: string;    // Applicant name
  submissionDate: Date;     // Application submission date
  coordinates: GeographicCoordinate;  // Application site location
  status: ApplicationStatus;          // Current application status
  comments: NeighborComment[];        // Array of neighbor responses
  createdAt: Date;
  updatedAt: Date;
}