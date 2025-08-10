"use client"

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
  centered?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
  centered = false
}) => {
  const containerClasses = cn(
    'flex items-center gap-2',
    centered && 'justify-center',
    className
  );

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <Loader2 
        className={cn(
          'animate-spin text-primary',
          sizeClasses[size]
        )} 
      />
      {text && (
        <span 
          className={cn(
            'text-muted-foreground',
            textSizeClasses[size]
          )}
        >
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};