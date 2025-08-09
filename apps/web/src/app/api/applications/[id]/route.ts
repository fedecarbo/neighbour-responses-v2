import { NextRequest, NextResponse } from 'next/server'
import { loadApplicationById } from '@/utils/fileOperations'
import { createErrorResponse, withErrorHandler, logError, NotFoundError } from '@/utils/errorHandling'

/**
 * GET /api/applications/[id]
 * Returns specific planning application with comments
 */
export const GET = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const application = await loadApplicationById(id)
    
    if (!application) {
      throw new NotFoundError('Planning Application', id)
    }
    
    return NextResponse.json({
      application,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logError(error as Error, { endpoint: '/api/applications/[id]', method: 'GET', params: await params })
    const errorResponse = createErrorResponse(error as Error, `/api/applications/${(await params).id}`)
    
    const statusCode = error instanceof NotFoundError ? 404 : 500
    return NextResponse.json(errorResponse, { status: statusCode })
  }
})