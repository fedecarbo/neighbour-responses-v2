"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, ArrowRight, BarChart3 } from 'lucide-react';

interface AnalyticsData {
  totalComments: number;
  positiveComments: number;
  negativeComments: number;
  neutralComments: number;
  pendingReview: number;
  approvedForPublication: number;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  periodLabel?: string;
}

interface AnalyticsWidgetProps {
  data: AnalyticsData;
  title: string;
  subtitle?: string;
  onDrillDown?: () => void;
  onViewDetails?: () => void;
  className?: string;
  isLoading?: boolean;
}

export const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({
  data,
  title,
  subtitle,
  onDrillDown,
  onViewDetails,
  className = '',
  isLoading = false
}) => {
  const {
    totalComments,
    positiveComments,
    negativeComments,
    neutralComments,
    pendingReview,
    approvedForPublication,
    trend,
    trendPercentage,
    periodLabel = 'vs previous period'
  } = data;

  const positivePercentage = totalComments > 0 ? Math.round((positiveComments / totalComments) * 100) : 0;
  const negativePercentage = totalComments > 0 ? Math.round((negativeComments / totalComments) * 100) : 0;
  const neutralPercentage = totalComments > 0 ? Math.round((neutralComments / totalComments) * 100) : 0;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <div className="animate-pulse space-y-2">
            <div className="h-5 bg-muted rounded w-3/4"></div>
            {subtitle && <div className="h-4 bg-muted rounded w-1/2"></div>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {onDrillDown && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDrillDown}
              className="h-8 w-8 p-0"
              aria-label="View detailed analytics"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Comments with Trend */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{totalComments.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">total comments</span>
          </div>
          
          {trend && trendPercentage !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">
                {trendPercentage > 0 ? '+' : ''}{trendPercentage}%
              </span>
              <span className="text-muted-foreground">{periodLabel}</span>
            </div>
          )}
        </div>

        {/* Sentiment Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Sentiment Distribution</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Positive
                </Badge>
                <span className="text-sm font-medium">{positiveComments}</span>
              </div>
              <span className="text-sm text-muted-foreground">{positivePercentage}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  Neutral
                </Badge>
                <span className="text-sm font-medium">{neutralComments}</span>
              </div>
              <span className="text-sm text-muted-foreground">{neutralPercentage}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  Negative
                </Badge>
                <span className="text-sm font-medium">{negativeComments}</span>
              </div>
              <span className="text-sm text-muted-foreground">{negativePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Review Status</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 bg-yellow-50 rounded-md">
              <div className="text-lg font-semibold text-yellow-800">{pendingReview}</div>
              <div className="text-xs text-yellow-600">Pending Review</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-md">
              <div className="text-lg font-semibold text-green-800">{approvedForPublication}</div>
              <div className="text-xs text-green-600">Approved</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {onViewDetails && (
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="w-full"
            >
              View Detailed Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};