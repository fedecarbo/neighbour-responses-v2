/**
 * File Operations Utility Layer
 * Critical Rule: Never access JSON files directly - always use this utility layer
 * Source: architecture/coding-standards.md#critical-fullstack-rules
 */

import fs from 'fs/promises'
import path from 'path'
import { PlanningApplication, NeighborComment } from '@shared/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json')

// In-memory cache for performance optimization
let applicationsCache: PlanningApplication[] | null = null
let cacheTimestamp: number | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

/**
 * Load all planning applications from JSON file
 */
export async function loadApplications(): Promise<PlanningApplication[]> {
  try {
    // Check cache validity
    const now = Date.now()
    if (applicationsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_TTL) {
      return applicationsCache
    }

    // Read file and parse JSON
    const fileContent = await fs.readFile(APPLICATIONS_FILE, 'utf-8')
    const applications: PlanningApplication[] = JSON.parse(fileContent)
    
    // Update cache
    applicationsCache = applications
    cacheTimestamp = now
    
    return applications
  } catch (error) {
    console.error('Error loading applications:', error)
    throw new Error('Failed to load planning applications')
  }
}

/**
 * Load specific planning application by ID
 */
export async function loadApplicationById(id: string): Promise<PlanningApplication | null> {
  try {
    const applications = await loadApplications()
    return applications.find(app => app.id === id) || null
  } catch (error) {
    console.error(`Error loading application ${id}:`, error)
    return null
  }
}

/**
 * Save applications to JSON file
 * Used for comment updates and application modifications
 */
export async function saveApplications(applications: PlanningApplication[]): Promise<void> {
  try {
    const fileContent = JSON.stringify(applications, null, 2)
    await fs.writeFile(APPLICATIONS_FILE, fileContent, 'utf-8')
    
    // Update cache
    applicationsCache = applications
    cacheTimestamp = Date.now()
  } catch (error) {
    console.error('Error saving applications:', error)
    throw new Error('Failed to save planning applications')
  }
}

/**
 * Update a specific comment within an application
 * Critical: Preserves originalContent and sets isEdited flags for audit compliance
 */
export async function updateComment(
  applicationId: string,
  commentId: string,
  updates: Partial<NeighborComment>
): Promise<boolean> {
  try {
    const applications = await loadApplications()
    const applicationIndex = applications.findIndex(app => app.id === applicationId)
    
    if (applicationIndex === -1) {
      console.error(`Application not found: ${applicationId}`)
      return false
    }
    
    const commentIndex = applications[applicationIndex].comments.findIndex(
      comment => comment.id === commentId
    )
    
    if (commentIndex === -1) {
      console.error(`Comment not found: ${commentId}`)
      return false
    }
    
    const currentComment = applications[applicationIndex].comments[commentIndex]
    
    // Preserve audit trail for content changes
    if (updates.content && updates.content !== currentComment.content) {
      if (!currentComment.isEdited) {
        updates.originalContent = currentComment.content
      }
      updates.isEdited = true
    }
    
    // Update comment with timestamp
    applications[applicationIndex].comments[commentIndex] = {
      ...currentComment,
      ...updates,
      updatedAt: new Date(),
    }
    
    // Update application timestamp
    applications[applicationIndex].updatedAt = new Date()
    
    await saveApplications(applications)
    return true
  } catch (error) {
    console.error('Error updating comment:', error)
    return false
  }
}

/**
 * Clear cache manually (useful for testing or forced refresh)
 */
export function clearCache(): void {
  applicationsCache = null
  cacheTimestamp = null
}