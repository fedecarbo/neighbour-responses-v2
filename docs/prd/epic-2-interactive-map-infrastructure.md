# Epic 2: Interactive Map Infrastructure

**Epic Goal:** Implement core interactive mapping functionality with mock data integration, delivering spatial visualization capability that demonstrates color-coded sentiment pins and basic filtering interactions for planning officers.

## Story 2.1: Mock Planning Data Structure

As a **planning officer**,
I want **realistic neighbor comment data with geographic coordinates**,
so that **I can test spatial workflows with representative UK planning application scenarios**.

### Acceptance Criteria
1. JSON mock data structure enhanced for one realistic UK planning application with expanded neighbor comments
2. The application includes 25-30 neighbor comments with geographic coordinates (latitude/longitude)
3. Comments include sentiment classification (red/yellow/green), neighbor addresses, and comment content
4. Geographic coordinates represent realistic UK residential planning scenarios with varied proximity to application sites
5. Data structure designed for easy expansion and PostgreSQL migration compatibility
6. Mock data accessible via API endpoints with proper TypeScript interfaces in `/shared` directory

## Story 2.2: Interactive Map Component with Color-Coded Pins

As a **planning officer**,
I want **an interactive map displaying color-coded neighbor sentiment pins**,
so that **I can immediately visualize geographic patterns in neighbor responses**.

### Acceptance Criteria
1. Leaflet or Mapbox map component integrated into Comments tab with UK-appropriate default zoom and center
2. Neighbor comment pins rendered with color-coding: red (negative), yellow (neutral), green (positive sentiment)
3. Map loads in under 2 seconds with smooth pan/zoom interactions
4. Pin click events capture and log selected neighbor location for filtering integration
5. Map displays proper UK geographic context with appropriate tile layers
6. Visual pin styling clearly distinguishable and professional for planning department use

## Story 2.3: Basic Pin Selection Feedback

As a **planning officer**,
I want **visual feedback when I click map pins**,
so that **I understand which neighbor locations I've selected for investigation**.

### Acceptance Criteria
1. Clicked pins display visual highlight (border, size change, or opacity modification)
2. Pin selection state persists during map interaction (pan/zoom) until deliberately cleared
3. Multiple pin selection supported with clear visual distinction between selected/unselected states
4. Selection state management implemented with proper React state handling
5. Basic selection clearing mechanism available (click outside pins or dedicated clear button)
6. Pin hover states provide additional visual feedback for improved user experience

## Story 2.4: Basic Comment List Display

As a **planning officer**,
I want **a comment list displaying neighbor responses alongside the map**,
so that **I can review detailed comment content in spatial context**.

### Acceptance Criteria
1. Comment list component created in Comments tab displaying all neighbor comments from mock data
2. Each comment entry shows neighbor address, sentiment indicator, comment excerpt (first 100 characters), and timestamp
3. Comment list renders in under 1 second for up to 500 comments with proper virtualization if needed
4. Individual comments expandable to show full content with basic formatting preservation
5. List styling consistent with Shadcn UI components and planning department interface standards
6. Comment list positioned alongside map component with appropriate responsive layout