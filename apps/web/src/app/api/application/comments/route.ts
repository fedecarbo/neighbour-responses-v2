import { NextRequest, NextResponse } from 'next/server'
import { getComments } from '@/utils/fileOperations'
import { SentimentType } from '@shared/types'

/**
 * GET /api/application/comments
 * Returns comments with optional filtering
 * Query params: sentiment, search
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse sentiment filter
    const sentimentParam = searchParams.get('sentiment')
    const sentiment = sentimentParam ? 
      sentimentParam.split(',').filter(s => ['positive', 'neutral', 'negative'].includes(s)) as SentimentType[] : 
      undefined
    
    // Parse search query
    const search = searchParams.get('search') || undefined
    
    const comments = await getComments({ sentiment, search })
    
    return NextResponse.json({
      data: comments,
      success: true,
      total: comments.length
    })
  } catch (error) {
    console.error('Error loading comments:', error)
    return NextResponse.json({
      data: [],
      success: false,
      error: 'Failed to load comments'
    }, { status: 500 })
  }
}