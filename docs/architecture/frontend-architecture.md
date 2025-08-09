# Frontend Architecture

## UI Styling Standards

**Critical UI Rules:**
- Use only default Shadcn UI components without any customizations to appearance or styling
- Apply only default Tailwind CSS theme without custom color palettes, spacing, or typography modifications
- No custom adjustments to component look and feel - maintain consistent default styling across all components

## Component Architecture

### Component Organization
```
/src/
├── components/
│   ├── ui/                    // Shadcn UI base components
│   ├── layout/
│   │   ├── AppLayout.tsx      // Main application shell
│   │   └── TabNavigation.tsx  // Dashboard/Comments tab switching
│   ├── dashboard/
│   │   ├── Analytics.tsx      // Statistics display with drill-down
│   │   └── StatCard.tsx       // Individual statistic components
│   ├── map/
│   │   ├── MapComponent.tsx   // Main Leaflet map container
│   │   ├── CommentPin.tsx     // Individual map pins with sentiment colors
│   │   └── MapControls.tsx    // Zoom, center, filter controls
│   ├── comments/
│   │   ├── CommentList.tsx    // Synchronized comment display
│   │   ├── CommentItem.tsx    // Individual comment entries
│   │   ├── CommentDetail.tsx  // Modal for detailed comment view
│   │   └── CommentEditor.tsx  // Text editing with officer notes
│   └── filters/
│       ├── FilterBar.tsx      // Filter controls and indicators
│       └── FilterState.tsx    // State management hooks
```

### Component Template
```typescript
// Example: CommentPin.tsx
import React from 'react';
import { NeighborComment } from '@/packages/shared/types';

interface CommentPinProps {
  comment: NeighborComment;
  isSelected: boolean;
  onPinClick: (commentId: string) => void;
  onPinHover: (commentId: string | null) => void;
}

export const CommentPin: React.FC<CommentPinProps> = ({
  comment,
  isSelected,
  onPinClick,
  onPinHover
}) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#22c55e'; // green
      case 'negative': return '#ef4444'; // red  
      case 'neutral': return '#eab308';  // yellow
      default: return '#6b7280'; // gray
    }
  };

  return (
    <div
      className={`comment-pin ${isSelected ? 'selected' : ''}`}
      style={{ 
        backgroundColor: getSentimentColor(comment.sentiment),
        border: isSelected ? '3px solid #1d4ed8' : 'none'
      }}
      onClick={() => onPinClick(comment.id)}
      onMouseEnter={() => onPinHover(comment.id)}
      onMouseLeave={() => onPinHover(null)}
    >
      {/* Pin visual representation */}
    </div>
  );
};
```

## State Management Architecture

### State Structure
```typescript
// FilterState context structure
interface FilterStateContext {
  selectedPins: string[];
  sentimentFilter: SentimentType[];
  statusFilter: CommentStatus[];
  searchQuery: string;
  geographicBounds: MapBounds | null;
  activeApplication: string;
  isDashboardFiltered: boolean;
  selectedComment: string | null;
}

// State management actions
type FilterAction = 
  | { type: 'SELECT_PIN'; commentId: string }
  | { type: 'SET_SENTIMENT_FILTER'; sentiments: SentimentType[] }
  | { type: 'SET_GEOGRAPHIC_BOUNDS'; bounds: MapBounds }
  | { type: 'CLEAR_ALL_FILTERS' };
```

## Routing Architecture

### Route Organization
```
/src/pages/
├── index.tsx                  // Redirect to /dashboard
├── dashboard/
│   └── [applicationId].tsx    // Dashboard analytics view
├── comments/
│   └── [applicationId].tsx    // Comments tab with map and list
└── api/                       // Next.js API routes
    └── applications/
        ├── index.ts           // GET all applications
        ├── [id].ts           // GET specific application
        └── [id]/
            ├── comments.ts    // GET/POST comments with filtering
            └── analytics.ts   // GET dashboard statistics
```

## Frontend Services Layer

### API Client Setup
```typescript
// /src/services/apiClient.ts
class PlanningAPIClient {
  private baseURL = '/api';
  
  async getApplication(id: string): Promise<PlanningApplication> {
    const response = await fetch(`${this.baseURL}/applications/${id}`);
    return response.json();
  }
  
  async getComments(
    applicationId: string, 
    filters: CommentFilters
  ): Promise<NeighborComment[]> {
    const queryParams = new URLSearchParams();
    if (filters.sentiment?.length) {
      queryParams.append('sentiment', filters.sentiment.join(','));
    }
    
    const response = await fetch(
      `${this.baseURL}/applications/${applicationId}/comments?${queryParams}`
    );
    return response.json();
  }
}

export const apiClient = new PlanningAPIClient();
```
