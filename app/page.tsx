'use client';

import React, { useState } from 'react';
import GamesPage from '@/components/GamesPage';


export default function Home() {
  const [activeTab, setActiveTab] = useState('Games');

  const renderContent = () => {
    switch (activeTab) {

      case 'Games':
        return <GamesPage />;

      default:
        return (
          <div className="p-8 text-center text-white">
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="mt-4 text-lg">The content you are looking for does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Only show Header if not on Games page */}
      

      <main className="container mx-auto" style={{ maxWidth: '1440px' }}>
        {renderContent()}
      </main>
    </div>
  );
}
