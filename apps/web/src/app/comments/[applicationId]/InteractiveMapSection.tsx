"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { PlanningApplication, NeighborComment } from '@shared/types';

// Dynamically import the map component with no SSR
const MapComponent = dynamic(
  () => import('@/components/map/MapComponent').then(mod => ({ default: mod.MapComponent })),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[450px] flex items-center justify-center bg-muted/20 border border-border rounded-md">
        <LoadingSpinner />
      </div>
    )
  }
);

interface InteractiveMapSectionProps {
  applicationId: string;
}

export const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({ applicationId }) => {
  const [application, setApplication] = useState<PlanningApplication | null>(null);
  const [comments, setComments] = useState<NeighborComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommentIds, setSelectedCommentIds] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        
        // Fetch application data
        const appResponse = await fetch(`/api/application?id=${applicationId}`);
        if (!appResponse.ok) {
          throw new Error('Failed to fetch application data');
        }
        
        const appResult = await appResponse.json();
        if (!appResult.success || !appResult.data) {
          throw new Error('Invalid application data received');
        }
        setApplication(appResult.data);
        setComments(appResult.data.comments || []);
        
      } catch (err) {
        console.error('Error fetching application data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map data');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [applicationId, isClient]);

  const handleCommentPinClick = (commentId: string) => {
    // Toggle selection for future filtering integration
    setSelectedCommentIds(prev => {
      if (prev.includes(commentId)) {
        return prev.filter(id => id !== commentId);
      }
      return [...prev, commentId];
    });
  };

  const handleApplicationPinClick = (appId: string) => {
    // Future: Navigate to application details or show application info
    console.log(`Application pin clicked for ${appId}`);
  };

  // Show loading until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="h-[450px] flex items-center justify-center bg-muted/20 border border-border rounded-md">
        <div className="text-muted-foreground">Initializing map...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[450px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[450px] flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="h-[450px] flex items-center justify-center">
        <ErrorMessage message="No application data available" />
      </div>
    );
  }

  return (
    <MapComponent
      application={application}
      comments={comments}
      onCommentPinClick={handleCommentPinClick}
      onApplicationPinClick={handleApplicationPinClick}
      selectedCommentIds={selectedCommentIds}
      height="450px"
    />
  );
};