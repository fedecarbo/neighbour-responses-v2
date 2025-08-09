import { NextResponse } from 'next/server'
import { loadApplications } from '@/utils/fileOperations'
import { createErrorResponse, withErrorHandler, logError } from '@/utils/errorHandling'

/**
 * GET /api/applications
 * Returns all planning applications from local JSON files
 */
export const GET = withErrorHandler(async () => {
  try {
    const applications = await loadApplications()
    
    return NextResponse.json({
      applications,
      total: applications.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logError(error as Error, { endpoint: '/api/applications', method: 'GET' })
    const errorResponse = createErrorResponse(error as Error, '/api/applications')
    return NextResponse.json(errorResponse, { status: 500 })
  }
})