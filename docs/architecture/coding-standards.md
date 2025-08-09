# Coding Standards

## Critical Fullstack Rules

- **Type Safety:** All geographic coordinates and planning data must use shared TypeScript interfaces from packages/shared
- **File Operations:** Never access JSON files directly - always use the fileOperations utility layer
- **State Management:** All filter state changes must go through the centralized FilterContext to maintain bi-directional synchronization
- **Error Boundaries:** Every major component (Map, CommentList, Dashboard) must have error boundary wrapping
- **Map Performance:** Pin components must be memoized and use stable keys to prevent unnecessary re-renders
- **Audit Compliance:** Comment updates must preserve originalContent and set isEdited flags for planning authority compliance
- **UI Components:** Only use default Shadcn UI components without any customizations to their appearance or styling
- **Theme Consistency:** Use only the default Tailwind CSS theme without custom color palettes, spacing, or typography modifications

## Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `MapComponent.tsx` |
| Hooks | camelCase with 'use' | - | `useFilterState.ts` |
| API Routes | kebab-case | - | `/api/applications` |
| JSON Properties | camelCase | camelCase | `neighborAddress` |
