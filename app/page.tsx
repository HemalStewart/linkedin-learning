'use client';

import React from 'react';
import VideoPlayerPage from '@/components/VideoPlayerPage';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <VideoPlayerPage courseId={1} />
    </div>
  );
}
