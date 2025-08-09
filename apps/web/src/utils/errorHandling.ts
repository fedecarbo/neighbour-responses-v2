/**
 * Error Handling Utilities
 * Centralized error handling for API routes and client-side operations
 */

export class APIError extends Error {
  public statusCode: number
  public code: string

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
    this.code = code
  }
}

export class ValidationError extends APIError {
  constructor(message: string, field?: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    // Field can be used for detailed validation error reporting in the future
    if (field) {
      // Reserved for future field-specific error handling
    }
  }
}

export class NotFoundError extends APIError {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} with ID '${id}' not found`
      : `${resource} not found`
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

/**
 * Standard API error response format
 */
export interface APIErrorResponse {
  error: {
    message: string
    code: string
    statusCode: number
    timestamp: string
    path?: string
  }
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  error: APIError | Error,
  path?: string
): APIErrorResponse {
  if (error instanceof APIError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        timestamp: new Date().toISOString(),
        path,
      }
    }
  }
  
  // Handle unknown errors
  return {
    error: {
      message: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path,
    }
  }
}

/**
 * Log error with context
 */
export function logError(error: Error, context?: Record<string, unknown>): void {
  console.error('Error:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Async error handler wrapper for API routes
 */
export function withErrorHandler<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await handler(...args)
    } catch (error) {
      logError(error as Error, { args })
      throw error
    }
  }
}