# Technical Assumptions

## Repository Structure: Monorepo
Single repository with `/frontend` and `/backend` directories, plus `/shared` directory for TypeScript interfaces ensuring data consistency across spatial data handling and comment management workflows.

## Service Architecture
Frontend-focused architecture with API abstraction layer, designed as monolith for rapid prototyping with future microservices decomposition capability as complexity increases. RESTful API design prepared for future planning system integrations with standardized data schemas compatible with UK planning data formats.

## Testing Requirements
Unit + Integration testing focusing on map interaction functionality, filtering synchronization, and cross-tab navigation workflows. Manual testing convenience methods for planning officer user validation scenarios reflecting typical application review workflows.

## Additional Technical Assumptions and Requests

**Frontend Technology Stack:**
- **Framework**: Next.js 14+ with TypeScript for robust development experience and server-side rendering capabilities
- **UI Components**: Shadcn UI component library for consistent planning department interface standards
- **Mapping**: Leaflet or Mapbox integration for interactive map functionality with color-coded pin rendering
- **State Management**: React state management for bi-directional map-list synchronization

**Backend & Data:**
- **API**: Node.js/Express with TypeScript for consistent language stack
- **Database**: Initial JSON-based mock data structure, designed for PostgreSQL with PostGIS extension scalability
- **Data Schema**: UK planning system coordinate compatibility, neighbor comment structure with geographic coordinates

**Infrastructure & Security:**
- **Hosting**: Local development server for prototype phase with local map tile serving
- **Security**: HTTPS enforcement, data sanitization for comment content, GDPR-compliant data handling patterns
- **Performance**: Browser-based map rendering optimization for 100+ pins, caching strategies for filter operations

**Browser & Platform:**
- **Target Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ with JavaScript and HTML5 Canvas support
- **Performance Targets**: Sub-2 second map loads, <500ms filter response, <1 second comment list rendering
