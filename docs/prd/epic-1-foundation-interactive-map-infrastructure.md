# Epic 1: Foundation & Interactive Map Infrastructure

**Epic Goal:** Establish project setup with Next.js/TypeScript architecture and core interactive mapping functionality, delivering initial spatial visualization capability that demonstrates color-coded sentiment pins and basic click interactions for planning officers.

## Story 1.1: Project Foundation Setup

As a **developer**,
I want **Next.js 14+ project with TypeScript, Shadcn UI, and tab-based routing architecture**,
so that **the application has a solid technical foundation for rapid spatial-first feature development**.

### Acceptance Criteria
1. Next.js 14+ project created with TypeScript configuration and proper folder structure (`/frontend`, `/backend`, `/shared`)
2. Shadcn UI component library integrated with consistent theming for planning department interfaces
3. Tab-based routing implemented with Dashboard and Comments tab navigation
4. Basic layout component created with professional styling appropriate for UK local authority applications
5. Development environment configured with proper linting, formatting, and build processes
6. Local development environment configured with proper security practices

## Story 1.2: Mock Planning Data Structure

As a **planning officer**,
I want **realistic neighbor comment data with geographic coordinates**,
so that **I can test spatial workflows with representative UK planning application scenarios**.

### Acceptance Criteria
1. JSON mock data structure created representing 2-3 realistic UK planning applications
2. Each application includes 15-30 neighbor comments with geographic coordinates (latitude/longitude)
3. Comments include sentiment classification (red/yellow/green), neighbor addresses, and comment content
4. Geographic coordinates represent realistic UK residential planning scenarios with varied proximity to application sites
5. Data structure designed for easy expansion and PostgreSQL migration compatibility
6. Mock data accessible via API endpoints with proper TypeScript interfaces in `/shared` directory

## Story 1.3: Interactive Map Component with Color-Coded Pins

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

## Story 1.4: Basic Pin Selection Feedback

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
