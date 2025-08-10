import { NextResponse } from 'next/server'
import { loadApplication } from '@/utils/fileOperations'

/**
 * GET /api/applications
 * Returns the single mock planning application for prototype
 */
export async function GET() {
  try {
    const application = await loadApplication()
    
    return NextResponse.json({
      data: application,
      success: true
    })
  } catch (error) {
    console.error('Error loading application:', error)
    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to load planning application'
    }, { status: 500 })
  }
}