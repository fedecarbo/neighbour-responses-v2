# Introduction

## Starter Template or Existing Project

Based on the PRD technical assumptions, this is a **greenfield project** with specific technology preferences:

**PRD-Specified Stack:**
- Next.js 14+ with TypeScript
- Shadcn UI component library  
- Leaflet/Mapbox for mapping
- Node.js/Express backend
- Local file-based storage
- Monorepo structure (`/frontend`, `/backend`, `/shared`)

**Template Recommendation:**
Consider the **T3 Stack** or **Next.js + tRPC starter** as potential foundations, offering:
- Next.js 14+ with TypeScript pre-configured
- tRPC for type-safe APIs (could replace REST)
- Monorepo-friendly structure
- Local development optimization

However, given the specific mapping requirements and custom workflow needs, a **custom setup** may provide better control over the spatial-first architecture requirements.

**Decision:** Custom Next.js setup to maintain full control over mapping integrations and planning officer workflow optimizations.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-08-06 | 1.0 | Initial architecture document creation | Winston (Architect) |
