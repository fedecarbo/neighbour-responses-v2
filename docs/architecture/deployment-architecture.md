# Deployment Architecture

## Deployment Strategy

**Local Development Only:**
- **Platform:** Local Node.js development server
- **Build Command:** `npm run build` (for production testing)
- **Output Directory:** `apps/web/.next`
- **Data Storage:** Local JSON files in `apps/web/data/`

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:3000 | http://localhost:3000/api | Local development |
