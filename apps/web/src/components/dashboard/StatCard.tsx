"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, ArrowRightIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string | number;
  trendLabel?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'positive' | 'negative' | 'warning' | 'info';
  onDrillDown?: () => void;
  isClickable?: boolean;
  className?: string;
  isLoading?: boolean;
}

const getVariantStyles = (variant: StatCardProps['variant']) => {
  switch (variant) {
    case 'positive':
      return {
        card: 'border-green-200 bg-green-50/50',
        value: 'text-green-700',
        title: 'text-green-800'
      };
    case 'negative':
      return {
        card: 'border-red-200 bg-red-50/50',
        value: 'text-red-700',
        title: 'text-red-800'
      };
    case 'warning':
      return {
        card: 'border-yellow-200 bg-yellow-50/50',
        value: 'text-yellow-700',
        title: 'text-yellow-800'
      };
    case 'info':
      return {
        card: 'border-blue-200 bg-blue-50/50',
        value: 'text-blue-700',
        title: 'text-blue-800'
      };
    default:
      return {
        card: 'border-border bg-background',
        value: 'text-foreground',
        title: 'text-muted-foreground'
      };
  }
};

const getTrendIcon = (trend: StatCardProps['trend']) => {
  const className = "h-3 w-3";
  switch (trend) {
    case 'up':
      return <ArrowUpIcon className={`${className} text-green-600`} />;
    case 'down':
      return <ArrowDownIcon className={`${className} text-red-600`} />;
    case 'stable':
      return <MinusIcon className={`${className} text-gray-600`} />;
    default:
      return null;
  }
};

const getTrendColor = (trend: StatCardProps['trend']) => {
  switch (trend) {
    case 'up':
      return 'text-green-600 bg-green-100';
    case 'down':
      return 'text-red-600 bg-red-100';
    case 'stable':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-muted-foreground bg-muted';
  }
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  trendLabel = 'vs previous period',
  icon,
  variant = 'default',
  onDrillDown,
  isClickable = false,
  className = '',
  isLoading = false
}) => {
  const styles = getVariantStyles(variant);

  const handleClick = () => {
    if (isClickable && onDrillDown) {
      onDrillDown();
    }
  };

  if (isLoading) {
    return (
      <Card className={`${styles.card} ${className}`}>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              {icon && <div className="h-5 w-5 bg-muted rounded"></div>}
            </div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`
        ${styles.card} 
        ${isClickable ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} 
        ${className}
      `}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View details for ${title}` : undefined}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Header with Title and Icon */}
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${styles.title}`}>
              {title}
            </h3>
            <div className="flex items-center gap-2">
              {icon && (
                <div className="text-muted-foreground">
                  {icon}
                </div>
              )}
              {onDrillDown && !isClickable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDrillDown}
                  className="h-6 w-6 p-0"
                  aria-label={`View details for ${title}`}
                >
                  <ArrowRightIcon className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Main Value */}
          <div className={`text-2xl font-bold ${styles.value}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>

          {/* Subtitle and Trend */}
          <div className="space-y-1">
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
            
            {trend && trendValue !== undefined && (
              <div className="flex items-center gap-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-2 py-0.5 ${getTrendColor(trend)}`}
                >
                  {getTrendIcon(trend)}
                  <span className="ml-1">
                    {typeof trendValue === 'number' && trendValue > 0 ? '+' : ''}
                    {typeof trendValue === 'number' ? trendValue.toLocaleString() : trendValue}
                  </span>
                </Badge>
                <span className="text-xs text-muted-foreground">{trendLabel}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};