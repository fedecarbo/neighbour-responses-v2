# Tech Stack

This is the DEFINITIVE technology selection for the entire project. This table serves as the single source of truth - all development must use these exact versions and approaches.

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.3+ | Type-safe development across spatial data handling | Essential for complex geographic coordinate interfaces and planning data schemas |
| Frontend Framework | Next.js | 14+ | React-based fullstack framework with API routes | PRD requirement + built-in API routes eliminate need for separate backend server |
| UI Component Library | Shadcn UI | Latest | Professional planning department interface components | PRD requirement + consistent government application styling |
| State Management | React Context + useReducer | React 18+ | Bi-directional map-list synchronization | Complex spatial filtering state requires centralized management without external dependencies |
| Backend Language | TypeScript | 5.3+ | Consistent language across stack | Shared planning data interfaces between frontend/backend |
| Backend Framework | Next.js API Routes | 14+ | Serverless API endpoints for file operations | Simplified architecture - no separate server needed for prototype |
| API Style | REST | - | Standard HTTP endpoints for planning data | Simple, well-understood for prototype with clear migration path |
| Database | JSON Files | - | Local file storage for planning/comment data | Prototype requirement - editable, version-controlled mock data |
| Cache | Node.js fs caching | - | In-memory file caching for performance | Meet sub-2 second load time requirements |
| File Storage | Local filesystem | - | Planning documents and data files | Prototype simplicity + version control integration |
| Authentication | None (Prototype) | - | Skip auth for prototype validation | Focus on core spatial workflows first |
| Frontend Testing | Vitest + Testing Library | Latest | Fast unit/integration tests for map components | Better performance than Jest for Vite-based testing |
| Backend Testing | Vitest | Latest | API route testing for file operations | Consistent testing framework across stack |
| E2E Testing | Playwright | Latest | Critical spatial workflow validation | PRD requires map interaction testing - Playwright handles complex DOM |
| Build Tool | Vite (via Next.js) | Latest | Fast development builds | Next.js 14+ uses Turbopack/Vite for optimal dev experience |
| Bundler | Next.js bundler | 14+ | Production optimization with tree shaking | Built-in optimization for React + mapping libraries |
| IaC Tool | None (Prototype) | - | Skip infrastructure as code | Local development only, no infrastructure to manage |
| CI/CD | None (Prototype) | - | Local development workflow | No deployment pipeline needed for prototype |
| Monitoring | Console logging | - | Basic development monitoring | Console-based logging sufficient for prototype validation |
| Logging | Console + local files | - | Development and error logging | Local logging sufficient for prototype development |
| CSS Framework | Tailwind CSS | 4.1+ | Utility-first styling with Shadcn UI | Latest features and performance improvements with Shadcn UI integration |
| Mapping Library | Leaflet | 1.9+ | Interactive map with custom pin rendering | Lightweight, flexible for complex spatial interactions vs Mapbox complexity |
| Map Tiles | OpenStreetMap | - | Free map tiles for UK planning data | No API keys required, suitable for government prototype |
