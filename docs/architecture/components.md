# Components

## WebApp (Next.js Frontend Application)

**Responsibility:** Main application shell providing tab-based navigation and spatial-first user interface for planning officers

**Key Interfaces:**
- Dashboard tab with analytics overview and drill-down navigation
- Comments tab with interactive map and synchronized comment list
- Responsive layout optimized for desktop planning workflows

**Dependencies:** MapComponent, CommentList, Analytics, FilterState management

**Technology Stack:** Next.js 14+, TypeScript, Shadcn UI (default components only), Tailwind CSS 4.1+ (default theme only), React Context for state management

**UI Component Rules:**
- Use only default Shadcn UI components without customizations
- Apply default Tailwind CSS theme without custom styling modifications
- Maintain consistent default appearance across all UI elements

## MapComponent (Interactive Spatial Interface)

**Responsibility:** Renders interactive Leaflet map with color-coded neighbor sentiment pins and handles spatial selection events

**Key Interfaces:**
- Pin rendering with sentiment-based color coding (red/yellow/green)
- Click event handling for pin selection and geographic filtering
- Bi-directional synchronization with comment list selections
- Map bounds change events for viewport-based filtering

**Dependencies:** Leaflet library, OpenStreetMap tiles, GeographicCoordinate data, FilterState

**Technology Stack:** React + Leaflet, TypeScript interfaces for geographic data, custom pin styling

## CommentList (Synchronized Data Display)

**Responsibility:** Displays filterable neighbor comments with real-time synchronization to map pin selections

**Key Interfaces:**
- Comment rendering with address, sentiment indicators, and excerpts
- Filter state updates from map pin selections
- Individual comment selection highlighting corresponding map pins
- Comment detail modal access and editing capabilities

**Dependencies:** FilterState, NeighborComment data model, CommentDetail component

**Technology Stack:** React components with Shadcn UI, virtualization for performance, TypeScript

## FilterState (Centralized State Management)

**Responsibility:** Manages bi-directional synchronization between map interactions, comment list filtering, and cross-tab navigation state

**Key Interfaces:**
- Pin selection state management and persistence
- Filter application for sentiment, status, and geographic bounds
- Cross-tab filter state preservation for Dashboard drill-down
- URL state synchronization for bookmarking filtered views

**Dependencies:** React Context, localStorage for persistence, URL routing integration

**Technology Stack:** React Context + useReducer, TypeScript state interfaces, Next.js router integration

## APIService (File-Based Data Layer)

**Responsibility:** Handles all data operations through Next.js API routes reading/writing local JSON files

**Key Interfaces:**
- Application data loading from /data/applications.json
- Comment filtering and CRUD operations
- Analytics calculation for Dashboard statistics
- File system operations with error handling and caching

**Dependencies:** Node.js fs module, JSON file parsing, TypeScript data models

**Technology Stack:** Next.js API routes, Node.js file operations, in-memory caching, TypeScript
