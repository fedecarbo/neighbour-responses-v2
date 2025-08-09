# Data Models

Based on the PRD requirements for UK planning officer workflows, I'll define the core data models that enable spatial-first navigation and bi-directional map-list synchronization.

## PlanningApplication

**Purpose:** Represents a UK planning application with associated neighbor responses and geographic context

**Key Attributes:**
- id: string - Unique application identifier (e.g., "APP/2024/0123")
- reference: string - Planning authority reference number
- address: string - Application site address
- description: string - Development description
- applicantName: string - Applicant name
- submissionDate: Date - Application submission date
- coordinates: GeographicCoordinate - Application site location
- status: ApplicationStatus - Current application status
- comments: NeighborComment[] - Array of neighbor responses

### TypeScript Interface
```typescript
interface PlanningApplication {
  id: string;
  reference: string;
  address: string;
  description: string;
  applicantName: string;
  submissionDate: Date;
  coordinates: GeographicCoordinate;
  status: ApplicationStatus;
  comments: NeighborComment[];
  createdAt: Date;
  updatedAt: Date;
}

type ApplicationStatus = 'submitted' | 'under_review' | 'consultation' | 'decision_pending' | 'approved' | 'refused';
```

### Relationships
- Has many NeighborComment entities (one-to-many)
- Contains GeographicCoordinate for spatial positioning

## NeighborComment

**Purpose:** Individual neighbor response with sentiment analysis and geographic location for spatial filtering

**Key Attributes:**
- id: string - Unique comment identifier
- applicationId: string - Reference to parent planning application
- neighborAddress: string - Commenting neighbor's address
- coordinates: GeographicCoordinate - Neighbor location for map pin positioning
- content: string - Full comment text
- sentiment: SentimentType - Color-coded sentiment classification
- submissionDate: Date - Comment submission timestamp
- status: CommentStatus - Publication/review status
- officerNotes: string - Planning officer annotations
- isEdited: boolean - Tracks officer modifications

### TypeScript Interface
```typescript
interface NeighborComment {
  id: string;
  applicationId: string;
  neighborAddress: string;
  coordinates: GeographicCoordinate;
  content: string;
  sentiment: SentimentType;
  submissionDate: Date;
  status: CommentStatus;
  officerNotes?: string;
  isEdited: boolean;
  originalContent?: string; // Audit trail for edits
  createdAt: Date;
  updatedAt: Date;
}

type SentimentType = 'positive' | 'neutral' | 'negative';
type CommentStatus = 'pending_review' | 'approved_for_publication' | 'confidential' | 'redacted';
```

### Relationships
- Belongs to PlanningApplication (many-to-one)
- Contains GeographicCoordinate for map pin rendering

## GeographicCoordinate

**Purpose:** Standardized geographic positioning for UK planning context with spatial query support

**Key Attributes:**
- latitude: number - Decimal degrees latitude (UK range: ~49.8 to 60.9)
- longitude: number - Decimal degrees longitude (UK range: ~-8.2 to 1.8)
- precision: number - Coordinate accuracy in meters
- source: string - Data source (e.g., "postcode_lookup", "manual_entry")

### TypeScript Interface
```typescript
interface GeographicCoordinate {
  latitude: number;
  longitude: number;
  precision?: number;
  source?: string;
}
```

### Relationships
- Used by PlanningApplication for site location
- Used by NeighborComment for neighbor positioning

## FilterState

**Purpose:** Centralized state management for bi-directional map-list synchronization and cross-tab navigation

**Key Attributes:**
- selectedPins: string[] - Array of selected neighbor comment IDs
- sentimentFilter: SentimentType[] - Active sentiment filters
- statusFilter: CommentStatus[] - Publication status filters
- searchQuery: string - Text search within comments
- activeApplication: string - Currently viewed application ID
- mapBounds: MapBounds - Current map viewport
- isDashboardFiltered: boolean - Indicates Dashboard drill-down active

### TypeScript Interface
```typescript
interface FilterState {
  selectedPins: string[];
  sentimentFilter: SentimentType[];
  statusFilter: CommentStatus[];
  searchQuery: string;
  activeApplication: string;
  mapBounds?: MapBounds;
  isDashboardFiltered: boolean;
}

interface MapBounds {
  northEast: GeographicCoordinate;
  southWest: GeographicCoordinate;
}
```

### Relationships
- References NeighborComment IDs for pin selection
- Coordinates with PlanningApplication for application context
