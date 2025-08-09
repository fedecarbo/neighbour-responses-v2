import { describe, it, expect, beforeEach } from 'vitest'
import { loadApplications, loadApplicationById, clearCache } from '@/utils/fileOperations'

describe('File Operations', () => {
  beforeEach(() => {
    clearCache()
  })

  it('loads all applications from JSON file', async () => {
    const applications = await loadApplications()
    expect(applications).toBeDefined()
    expect(Array.isArray(applications)).toBe(true)
    expect(applications.length).toBeGreaterThan(0)
  })

  it('loads specific application by ID', async () => {
    const application = await loadApplicationById('APP-2024-0001')
    expect(application).toBeDefined()
    expect(application?.id).toBe('APP-2024-0001')
    expect(application?.reference).toBe('APP/2024/0001')
  })

  it('returns null for non-existent application ID', async () => {
    const application = await loadApplicationById('NONEXISTENT')
    expect(application).toBeNull()
  })

  it('includes comments in application data', async () => {
    const application = await loadApplicationById('APP-2024-0001')
    expect(application?.comments).toBeDefined()
    expect(Array.isArray(application?.comments)).toBe(true)
    expect(application?.comments.length).toBeGreaterThan(0)
  })
})