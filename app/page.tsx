'use client';

import React, { Suspense } from 'react';
import VideoPlayerPage from '@/components/VideoPlayerPage';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="text-white p-6">Loading lessons…</div>}>
        <VideoPlayerPage courseId={1} />
      </Suspense>
    </div>
  );
}
