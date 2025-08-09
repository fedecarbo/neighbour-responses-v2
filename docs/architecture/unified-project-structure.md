# Unified Project Structure

```
uk-planning-neighbor-responses/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── src/
│       │   ├── components/     # React components
│       │   │   ├── ui/         # Shadcn UI components
│       │   │   ├── layout/     # App layout components
│       │   │   ├── dashboard/  # Dashboard-specific components
│       │   │   ├── map/        # Leaflet map components
│       │   │   ├── comments/   # Comment management components
│       │   │   └── filters/    # Filter state components
│       │   ├── pages/          # Next.js pages and API routes
│       │   │   ├── api/        # API endpoints
│       │   │   ├── dashboard/  # Dashboard pages
│       │   │   └── comments/   # Comments pages
│       │   ├── services/       # API client services
│       │   ├── context/        # React Context providers
│       │   ├── hooks/          # Custom React hooks
│       │   ├── utils/          # Frontend utilities
│       │   └── styles/         # Global styles
│       ├── public/             # Static assets
│       ├── data/               # **Local JSON data files**
│       │   ├── applications.json
│       │   └── sample-scenarios/
│       ├── tests/              # Tests
│       ├── package.json
│       └── next.config.js
├── packages/                   # Shared packages
│   ├── shared/                 # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── types/          # Planning data interfaces
│   │   │   ├── constants/      # Shared constants
│   │   │   └── utils/          # Shared utilities
│   │   └── package.json
│   └── config/                 # Shared configuration
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
├── scripts/                    # Development scripts
├── docs/                       # Documentation
│   ├── prd.md
│   └── architecture.md        # This document
├── .env.example                # Environment template
├── package.json                # Root package.json
└── README.md
```
