"use client"

import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorMessageProps {
  title?: string;
  message: string;
  variant?: 'alert' | 'card' | 'inline';
  severity?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
  onDismiss?: () => void;
  retryLabel?: string;
  dismissLabel?: string;
  showIcon?: boolean;
  className?: string;
}

const getIconByVariant = (severity: ErrorMessageProps['severity']) => {
  switch (severity) {
    case 'error':
      return <AlertCircle className="h-4 w-4" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4" />;
    case 'info':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getAlertVariant = (severity: ErrorMessageProps['severity']) => {
  switch (severity) {
    case 'error':
      return 'destructive';
    case 'warning':
      return 'default';
    case 'info':
      return 'default';
    default:
      return 'destructive';
  }
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  variant = 'alert',
  severity = 'error',
  onRetry,
  onDismiss,
  retryLabel = 'Try again',
  dismissLabel = 'Dismiss',
  showIcon = true,
  className = ''
}) => {
  const icon = showIcon ? getIconByVariant(severity) : null;
  
  const actions = (onRetry || onDismiss) && (
    <div className="flex gap-2 mt-3">
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="h-8"
        >
          <RefreshCw className="h-3 w-3 mr-2" />
          {retryLabel}
        </Button>
      )}
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-8"
        >
          <X className="h-3 w-3 mr-2" />
          {dismissLabel}
        </Button>
      )}
    </div>
  );

  if (variant === 'alert') {
    return (
      <Alert variant={getAlertVariant(severity)} className={className}>
        {icon}
        <AlertDescription>
          <div>
            {title && title !== 'Error' && (
              <div className="font-medium mb-1">{title}</div>
            )}
            <div>{message}</div>
            {actions}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            {icon && (
              <div className="flex justify-center text-destructive">
                {React.cloneElement(icon, { className: 'h-12 w-12' })}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
              )}
              <p className="text-muted-foreground">{message}</p>
            </div>
            {actions}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Inline variant
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {icon && <div className="text-destructive mt-0.5">{icon}</div>}
      <div className="flex-1 min-w-0">
        {title && title !== 'Error' && (
          <div className="font-medium text-sm mb-1">{title}</div>
        )}
        <div className="text-sm text-muted-foreground">{message}</div>
        {actions && <div className="mt-2">{actions}</div>}
      </div>
      {onDismiss && !actions && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-6 w-6 p-0 hover:bg-transparent"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};