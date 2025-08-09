import { NextRequest, NextResponse } from 'next/server'
import { updateComment } from '@/utils/fileOperations'
import { createErrorResponse, withErrorHandler, logError, NotFoundError, ValidationError } from '@/utils/errorHandling'
import { NeighborComment } from '@shared/types'

/**
 * PUT /api/applications/[id]/comments/[commentId]
 * Updates a specific comment with audit trail compliance
 */
export const PUT = withErrorHandler(async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) => {
  try {
    const { id, commentId } = await params
    const body = await request.json()
    
    // Validate request body
    if (!body || typeof body !== 'object') {
      throw new ValidationError('Request body must be a valid object')
    }
    
    // Extract allowed update fields
    const allowedFields: (keyof NeighborComment)[] = [
      'content', 'sentiment', 'status', 'officerNotes'
    ]
    
    const updates: Partial<NeighborComment> = {}
    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = body[field]
      }
    }
    
    if (Object.keys(updates).length === 0) {
      throw new ValidationError('No valid fields provided for update')
    }
    
    const success = await updateComment(id, commentId, updates)
    
    if (!success) {
      throw new NotFoundError('Application or Comment', `${id}/${commentId}`)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Comment updated successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logError(error as Error, { 
      endpoint: '/api/applications/[id]/comments/[commentId]', 
      method: 'PUT', 
      params: await params 
    })
    const errorResponse = createErrorResponse(
      error as Error, 
      `/api/applications/${(await params).id}/comments/${(await params).commentId}`
    )
    
    let statusCode = 500
    if (error instanceof NotFoundError) statusCode = 404
    if (error instanceof ValidationError) statusCode = 400
    
    return NextResponse.json(errorResponse, { status: statusCode })
  }
})