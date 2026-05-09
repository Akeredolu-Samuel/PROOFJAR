import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 flex items-center justify-center min-h-[80vh]">
        <div className="text-center p-8">
          <span className="text-6xl block mb-4">🫙</span>
          <h1 className="text-4xl font-black text-foreground mb-2">404</h1>
          <p className="text-muted-foreground mb-6">This page doesn't exist in the jar.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
