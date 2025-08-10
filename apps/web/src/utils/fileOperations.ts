/**
 * File Operations Utility Layer
 * Critical Rule: Never access JSON files directly - always use this utility layer
 * Source: architecture/coding-standards.md#critical-fullstack-rules
 */

import fs from 'fs/promises'
import path from 'path'
import { PlanningApplication, NeighborComment, SentimentType } from '@shared/types'

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const MOCK_APPLICATION_FILE = path.join(DATA_DIR, 'mock-application.json')

// In-memory cache for performance optimization
let applicationCache: PlanningApplication | null = null
let cacheTimestamp: number | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Load the single mock planning application
 */
export async function loadApplication(): Promise<PlanningApplication> {
  try {
    // Check cache validity
    const now = Date.now()
    if (applicationCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_TTL) {
      return applicationCache
    }

    // Read file and parse JSON
    const fileContent = await fs.readFile(MOCK_APPLICATION_FILE, 'utf-8')
    const application: PlanningApplication = JSON.parse(fileContent)
    
    // Update cache
    applicationCache = application
    cacheTimestamp = now
    
    return application
  } catch (error) {
    console.error('Error loading application:', error)
    throw new Error('Failed to load planning application')
  }
}

/**
 * Save application to JSON file
 * Used for comment updates and application modifications
 */
export async function saveApplication(application: PlanningApplication): Promise<void> {
  try {
    const fileContent = JSON.stringify(application, null, 2)
    await fs.writeFile(MOCK_APPLICATION_FILE, fileContent, 'utf-8')
    
    // Update cache
    applicationCache = application
    cacheTimestamp = Date.now()
  } catch (error) {
    console.error('Error saving application:', error)
    throw new Error('Failed to save planning application')
  }
}

/**
 * Update a specific comment within the application
 * For prototype: simple officer notes updates
 */
export async function updateComment(
  commentId: string,
  updates: Partial<NeighborComment>
): Promise<boolean> {
  try {
    const application = await loadApplication()
    
    const commentIndex = application.comments.findIndex(
      comment => comment.id === commentId
    )
    
    if (commentIndex === -1) {
      console.error(`Comment not found: ${commentId}`)
      return false
    }
    
    // Update comment
    application.comments[commentIndex] = {
      ...application.comments[commentIndex],
      ...updates,
    }
    
    await saveApplication(application)
    return true
  } catch (error) {
    console.error('Error updating comment:', error)
    return false
  }
}

/**
 * Get comments with optional filtering
 */
export async function getComments(filters?: {
  sentiment?: SentimentType[];
  search?: string;
}): Promise<NeighborComment[]> {
  try {
    const application = await loadApplication()
    let comments = application.comments
    
    if (filters?.sentiment && filters.sentiment.length > 0) {
      comments = comments.filter(comment => 
        filters.sentiment!.includes(comment.sentiment)
      )
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      comments = comments.filter(comment =>
        comment.content.toLowerCase().includes(searchLower) ||
        comment.neighborAddress.toLowerCase().includes(searchLower) ||
        (comment.officerNotes && comment.officerNotes.toLowerCase().includes(searchLower))
      )
    }
    
    return comments
  } catch (error) {
    console.error('Error getting comments:', error)
    return []
  }
}

/**
 * Clear cache manually (useful for testing or forced refresh)
 */
export function clearCache(): void {
  applicationCache = null
  cacheTimestamp = null
}

// Types are now imported from @shared/types