# Source Tree Architecture

## Project Overview
The UK Planning Officer Neighbor Response Web App follows a **spatial-first, tab-based architecture** designed for efficient planning officer workflows. This source tree reflects our holistic system design principles: progressive complexity, user-centric architecture, and cross-stack optimization.

## Complete Project Structure

```
uk-planning-neighbor-responses/
├── 📁 apps/
│   └── 📱 web/                           # Main Next.js Application Layer
│       ├── 📁 src/                       # Application Source Code
│       │   ├── 📁 components/            # React Component Architecture
│       │   │   ├── 📁 ui/               # Shadcn UI Foundation Components
│       │   │   │   ├── button.tsx       # Base interactive elements
│       │   │   │   ├── card.tsx         # Container components
│       │   │   │   ├── tabs.tsx         # Tab navigation system
│       │   │   │   ├── badge.tsx        # Status indicators
│       │   │   │   ├── select.tsx       # Filter dropdown components
│       │   │   │   └── dialog.tsx       # Modal interaction patterns
│       │   │   ├── 📁 layout/           # Application Layout System
│       │   │   │   ├── header.tsx       # Global navigation header
│       │   │   │   ├── sidebar.tsx      # Secondary navigation
│       │   │   │   ├── main-layout.tsx  # Primary layout container
│       │   │   │   └── tab-layout.tsx   # Tab-specific layout wrapper
│       │   │   ├── 📁 dashboard/        # Analytics Dashboard Components
│       │   │   │   ├── metrics-overview.tsx     # Key statistics display
│       │   │   │   ├── sentiment-chart.tsx      # Visual sentiment breakdown
│       │   │   │   ├── geographic-stats.tsx     # Spatial distribution metrics
│       │   │   │   ├── clickable-metric.tsx     # Drill-down navigation elements
│       │   │   │   └── dashboard-filters.tsx    # Dashboard-specific filtering
│       │   │   ├── 📁 map/              # Interactive Map System
│       │   │   │   ├── leaflet-map.tsx          # Core map component
│       │   │   │   ├── comment-pin.tsx          # Sentiment-coded map pins
│       │   │   │   ├── map-controls.tsx         # Zoom, layer controls
│       │   │   │   ├── pin-cluster.tsx          # Pin clustering logic
│       │   │   │   ├── map-legend.tsx           # Color-coding reference
│       │   │   │   └── spatial-selector.tsx     # Geographic selection tools
│       │   │   ├── 📁 comments/         # Comment Management System
│       │   │   │   ├── comment-list.tsx         # Filterable comment display
│       │   │   │   ├── comment-item.tsx         # Individual comment component
│       │   │   │   ├── comment-editor.tsx       # Inline editing interface
│       │   │   │   ├── sentiment-indicator.tsx  # Visual sentiment display
│       │   │   │   ├── publication-controls.tsx # Publish/redact actions
│       │   │   │   └── bulk-operations.tsx      # Batch processing tools
│       │   │   └── 📁 filters/          # Centralized Filter Management
│       │   │       ├── filter-provider.tsx      # Global filter context
│       │   │       ├── filter-bar.tsx           # Primary filter interface
│       │   │       ├── sentiment-filter.tsx     # Sentiment-specific filters
│       │   │       ├── geographic-filter.tsx    # Location-based filtering
│       │   │       └── filter-state.tsx         # Filter synchronization logic
│       │   ├── 📁 pages/                # Next.js Pages & API Layer
│       │   │   ├── 📁 api/              # Backend API Endpoints
│       │   │   │   ├── 📁 applications/ # Planning application data
│       │   │   │   │   ├── [id].ts      # Individual application endpoint
│       │   │   │   │   └── index.ts     # Application listing endpoint
│       │   │   │   ├── 📁 comments/     # Comment management endpoints
│       │   │   │   │   ├── [id].ts      # Individual comment operations
│       │   │   │   │   ├── bulk.ts      # Batch operations endpoint
│       │   │   │   │   └── sentiment.ts # Sentiment analysis endpoint
│       │   │   │   └── 📁 filters/      # Filter state management
│       │   │   │       └── state.ts     # Filter persistence endpoint
│       │   │   ├── 📁 dashboard/        # Dashboard Page Routes
│       │   │   │   └── [applicationId].tsx # Application-specific dashboard
│       │   │   ├── 📁 comments/         # Comment Management Routes
│       │   │   │   └── [applicationId].tsx # Application comment interface
│       │   │   └── index.tsx            # Application landing page
│       │   ├── 📁 services/             # API Client Services Layer
│       │   │   ├── api-client.ts        # Core HTTP client configuration
│       │   │   ├── applications.ts      # Planning application service
│       │   │   ├── comments.ts          # Comment management service
│       │   │   ├── spatial.ts           # Geographic data service
│       │   │   └── filters.ts           # Filter state service
│       │   ├── 📁 context/              # React Context Providers
│       │   │   ├── application-context.tsx     # Current application state
│       │   │   ├── filter-context.tsx          # Global filter state
│       │   │   ├── map-context.tsx             # Map interaction state
│       │   │   └── user-context.tsx            # Officer session context
│       │   ├── 📁 hooks/                # Custom React Hooks
│       │   │   ├── use-applications.ts         # Application data management
│       │   │   ├── use-comments.ts             # Comment operations
│       │   │   ├── use-filters.ts              # Filter state management
│       │   │   ├── use-map-interactions.ts     # Map click handling
│       │   │   ├── use-dashboard-metrics.ts    # Analytics calculations
│       │   │   └── use-bulk-operations.ts      # Batch processing logic
│       │   ├── 📁 utils/                # Frontend Utility Functions
│       │   │   ├── spatial.ts           # Geographic calculations
│       │   │   ├── sentiment.ts         # Sentiment analysis helpers
│       │   │   ├── filters.ts           # Filter logic utilities
│       │   │   ├── formatters.ts        # Data display formatting
│       │   │   └── constants.ts         # Frontend constants
│       │   └── 📁 styles/               # Styling System
│       │       ├── globals.css          # Global CSS variables
│       │       ├── components.css       # Component-specific styles
│       │       └── map.css              # Map-specific styling
│       ├── 📁 public/                   # Static Assets
│       │   ├── 📁 images/               # Static images
│       │   │   ├── pin-icons/           # Map pin graphics
│       │   │   └── ui-assets/           # Interface graphics
│       │   ├── 📁 map-tiles/            # Cached map tile assets
│       │   └── favicon.ico              # Site favicon
│       ├── 📁 data/                     # **Mock Data Layer** (MVP Phase)
│       │   ├── applications.json        # Sample planning applications
│       │   ├── comments.json            # Sample neighbor comments
│       │   ├── spatial-data.json        # Geographic coordinates
│       │   └── 📁 sample-scenarios/     # Test scenario datasets
│       │       ├── high-volume-app.json         # Stress test data
│       │       ├── mixed-sentiment.json         # Sentiment variety
│       │       └── geographic-spread.json       # Spatial distribution
│       ├── 📁 tests/                    # Testing Infrastructure
│       │   ├── 📁 __tests__/            # Unit tests
│       │   │   ├── components/          # Component testing
│       │   │   ├── hooks/               # Hook testing
│       │   │   └── utils/               # Utility function tests
│       │   ├── 📁 e2e/                  # End-to-end tests
│       │   │   ├── dashboard-flow.spec.ts       # Dashboard workflow tests
│       │   │   ├── comment-management.spec.ts   # Comment processing tests
│       │   │   └── cross-tab-navigation.spec.ts # Tab interaction tests
│       │   ├── 📁 fixtures/             # Test data fixtures
│       │   └── setup.ts                 # Test configuration
│       ├── package.json                 # Application dependencies
│       ├── next.config.js              # Next.js configuration
│       ├── tailwind.config.js          # Styling configuration
│       └── tsconfig.json               # TypeScript configuration
├── 📁 packages/                        # Shared Packages (Monorepo Architecture)
│   ├── 📁 shared/                      # Shared TypeScript Definitions
│   │   ├── 📁 src/                     # Shared source code
│   │   │   ├── 📁 types/               # TypeScript Interface Definitions
│   │   │   │   ├── planning.ts         # Planning application interfaces
│   │   │   │   ├── comments.ts         # Comment system types
│   │   │   │   ├── spatial.ts          # Geographic data types
│   │   │   │   ├── filters.ts          # Filter state types
│   │   │   │   └── ui.ts               # UI component prop types
│   │   │   ├── 📁 constants/           # Shared Constants
│   │   │   │   ├── sentiment.ts        # Sentiment classification values
│   │   │   │   ├── geographic.ts       # UK geographic standards
│   │   │   │   └── planning.ts         # Planning system constants
│   │   │   └── 📁 utils/               # Shared Utilities
│   │   │       ├── validation.ts       # Data validation schemas
│   │   │       ├── transformers.ts     # Data transformation helpers
│   │   │       └── calculators.ts      # Shared calculation functions
│   │   ├── package.json                # Shared package dependencies
│   │   └── tsconfig.json              # Shared TypeScript config
│   └── 📁 config/                     # Shared Configuration
│       ├── 📁 eslint/                 # Code quality standards
│       │   └── index.js               # Shared ESLint configuration
│       ├── 📁 typescript/             # TypeScript configurations
│       │   ├── base.json              # Base TS config
│       │   └── strict.json            # Strict mode configuration
│       └── 📁 tailwind/               # Styling configurations
│           ├── base.config.js         # Base Tailwind config
│           └── planning-theme.js      # Planning-specific design tokens
├── 📁 scripts/                        # Development & Deployment Scripts
│   ├── setup-dev-environment.sh       # Development environment setup
│   ├── generate-mock-data.ts          # Mock data generation utility
│   ├── validate-data-schemas.ts       # Data validation script
│   ├── build-production.sh            # Production build process
│   └── deploy-staging.sh              # Staging deployment script
├── 📁 docs/                          # **Comprehensive Documentation**
│   ├── 📁 architecture/               # Technical Architecture Documentation
│   │   ├── index.md                   # Architecture overview
│   │   ├── high-level-architecture.md # System design patterns
│   │   ├── frontend-architecture.md   # Frontend system design
│   │   ├── backend-architecture.md    # API and data layer design
│   │   ├── unified-project-structure.md # This document
│   │   ├── source-tree.md            # **This file - architectural source tree**
│   │   ├── components.md              # Component architecture
│   │   ├── data-models.md             # Data structure specifications
│   │   ├── database-schema.md         # Data persistence design
│   │   ├── api-specification.md       # API endpoint specifications
│   │   ├── tech-stack.md              # Technology decisions
│   │   ├── core-workflows.md          # User workflow architecture
│   │   ├── security-and-performance.md # Non-functional requirements
│   │   ├── testing-strategy.md        # Quality assurance approach
│   │   ├── deployment-architecture.md # Infrastructure design
│   │   ├── monitoring-and-observability.md # System monitoring
│   │   ├── error-handling-strategy.md # Error management patterns
│   │   ├── external-apis.md           # Third-party integrations
│   │   ├── development-workflow.md    # Development processes
│   │   ├── coding-standards.md        # Code quality standards
│   │   └── summary.md                 # Architecture summary
│   ├── 📁 prd/                       # Product Requirements Documentation
│   │   ├── index.md                   # PRD overview
│   │   ├── goals-and-background-context.md # Product context
│   │   ├── requirements.md            # Functional requirements
│   │   ├── technical-assumptions.md   # Technical constraints
│   │   ├── user-interface-design-goals.md # UX design principles
│   │   ├── epic-list.md              # Feature epic breakdown
│   │   ├── epic-1-foundation-interactive-map-infrastructure.md
│   │   ├── epic-2-bi-directional-map-list-integration.md
│   │   ├── epic-3-dashboard-analytics-cross-tab-navigation.md
│   │   ├── epic-4-comment-management-officer-workflows.md
│   │   ├── checklist-results-report.md # Quality assurance results
│   │   └── next-steps.md              # Implementation roadmap
│   ├── brief.md                       # Executive project summary
│   ├── prd.md                         # Master product requirements
│   ├── architecture.md                # Master architecture document
│   └── brainstorming-session-results.md # Design process documentation
├── .env.example                       # Environment configuration template
├── .env.local                         # Local development environment
├── .gitignore                         # Git exclusion patterns
├── .eslintrc.js                       # Code quality configuration
├── package.json                       # Root package management
├── tsconfig.json                      # Root TypeScript configuration
├── README.md                          # Project documentation entry point
└── CLAUDE.md                          # AI Assistant project context

```

## Architectural Design Patterns

### 🏗️ **Spatial-First Architecture**
The source tree reflects our core principle that **geographic relationships drive application structure**. Map components and spatial utilities are first-class citizens, not afterthoughts.

### 📊 **Tab-Based Workflow Separation** 
Clear separation between `dashboard/` (analytics) and `comments/` (detailed management) components prevents cognitive overload while maintaining workflow continuity.

### 🔄 **Centralized Filter Management**
The dedicated `filters/` directory implements single-source-of-truth filtering that synchronizes across map visualization, comment lists, and dashboard analytics.

### 🎯 **Progressive Complexity Design**
Structure starts simple (core components) but scales systematically:
- **Level 1**: Basic UI components (`ui/`)
- **Level 2**: Feature-specific components (`dashboard/`, `map/`, `comments/`)  
- **Level 3**: Complex interaction patterns (`filters/`, context providers)

### 🚀 **Monorepo Scalability**
`packages/shared/` enables code reuse and maintains consistency as the system grows toward multi-authority deployment.

## Key Architectural Decisions

### **Frontend-First Approach**
During MVP phase, the architecture prioritizes rapid prototyping with mock data (`data/` directory) while preparing for backend integration through well-defined API service layers.

### **Component Hierarchy Strategy**
Components follow domain-driven organization rather than technical grouping, making the codebase intuitive for planning domain experts.

### **Testing-Integrated Structure** 
Testing is embedded within the architecture (`tests/` with domain-specific test organization) rather than treated as an afterthought.

### **Documentation-as-Code**
Comprehensive `docs/` structure ensures architectural decisions are captured and maintained as the system evolves.

## Next Implementation Steps

1. **Foundation**: Establish Next.js project with TypeScript and Shadcn UI
2. **Core Mapping**: Implement Leaflet integration with color-coded pins
3. **Filter Architecture**: Build centralized filtering with cross-component synchronization  
4. **Tab Navigation**: Develop dashboard-to-comments workflow patterns
5. **Mock Data Integration**: Create realistic planning application scenarios

This source tree represents a **holistic system architecture** designed for efficient planning officer workflows while maintaining the flexibility to scale toward full UK local authority deployment.