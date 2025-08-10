import { NextRequest, NextResponse } from 'next/server'
import { updateComment } from '@/utils/fileOperations'

/**
 * PUT /api/application/comments/[id]
 * Update a specific comment (mainly officer notes for prototype)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: commentId } = await params
    const body = await request.json()
    
    // For prototype, only allow updating officerNotes
    const updates = {
      officerNotes: body.officerNotes || ''
    }
    
    const success = await updateComment(commentId, updates)
    
    if (!success) {
      return NextResponse.json({
        data: null,
        success: false,
        error: 'Comment not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      data: { commentId, ...updates },
      success: true
    })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to update comment'
    }, { status: 500 })
  }
}