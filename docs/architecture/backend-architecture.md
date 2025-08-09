# Backend Architecture

## Service Architecture

### Function Organization
```
/src/pages/api/
├── applications/
│   ├── index.ts              // GET /api/applications
│   ├── [id].ts              // GET /api/applications/{id}
│   └── [id]/
│       ├── comments.ts       // GET/POST comments
│       ├── analytics.ts      // GET analytics  
│       └── comments/
│           └── [commentId].ts // PUT comment updates
└── utils/
    ├── fileOperations.ts     // Shared file I/O utilities
    └── errorHandling.ts      // Centralized error responses
```

### Function Template
```typescript
// /src/pages/api/applications/[id]/comments.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { readApplicationData } from '../../../utils/fileOperations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: applicationId } = req.query;
  
  try {
    switch (req.method) {
      case 'GET':
        return await getFilteredComments(req, res, applicationId as string);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getFilteredComments(
  req: NextApiRequest,
  res: NextApiResponse,
  applicationId: string
) {
  const filters = {
    sentiment: req.query.sentiment ? 
      (req.query.sentiment as string).split(',') : undefined,
    bounds: req.query.bounds ? 
      parseBounds(req.query.bounds as string) : undefined
  };
  
  const applicationData = await readApplicationData(applicationId);
  if (!applicationData) {
    return res.status(404).json({ error: 'Application not found' });
  }
  
  let filteredComments = applicationData.comments;
  
  if (filters.sentiment?.length) {
    filteredComments = filteredComments.filter(comment =>
      filters.sentiment!.includes(comment.sentiment)
    );
  }
  
  return res.status(200).json({
    comments: filteredComments,
    total: applicationData.comments.length,
    filtered: filteredComments.length
  });
}
```

## Database Architecture (File-Based)

### Data Access Layer
```typescript
// /src/utils/fileOperations.ts
import fs from 'fs/promises';
import path from 'path';
import { PlanningApplication } from '@/packages/shared/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');

// In-memory cache for performance
let applicationsCache: { data: PlanningApplication[]; lastModified: number } | null = null;

export async function readApplicationData(applicationId: string): Promise<PlanningApplication | null> {
  const applications = await getAllApplications();
  return applications.find(app => app.id === applicationId) || null;
}

export async function getAllApplications(): Promise<PlanningApplication[]> {
  try {
    const stats = await fs.stat(APPLICATIONS_FILE);
    const fileModified = stats.mtime.getTime();
    
    if (applicationsCache && applicationsCache.lastModified >= fileModified) {
      return applicationsCache.data;
    }
    
    const fileContent = await fs.readFile(APPLICATIONS_FILE, 'utf-8');
    const parsedData = JSON.parse(fileContent);
    
    applicationsCache = {
      data: parsedData.applications,
      lastModified: fileModified
    };
    
    return parsedData.applications;
  } catch (error) {
    console.error('Error reading applications data:', error);
    throw new Error('Failed to load planning applications');
  }
}

export async function writeApplicationData(
  applicationId: string, 
  updatedApplication: PlanningApplication
): Promise<void> {
  try {
    const applications = await getAllApplications();
    const index = applications.findIndex(app => app.id === applicationId);
    
    if (index === -1) {
      throw new Error('Application not found');
    }
    
    applications[index] = {
      ...updatedApplication,
      updatedAt: new Date().toISOString()
    };
    
    const fileContent = JSON.stringify({ applications }, null, 2);
    await fs.writeFile(APPLICATIONS_FILE, fileContent, 'utf-8');
    
    applicationsCache = null;
    
  } catch (error) {
    console.error('Error writing applications data:', error);
    throw new Error('Failed to update planning application');
  }
}
```
