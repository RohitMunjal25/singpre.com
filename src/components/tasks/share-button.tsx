"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  url: string;
  title?: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopiedPopup(true);
      setTimeout(() => setShowCopiedPopup(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="inline-flex items-center gap-2 border-white/35 bg-white/10 text-white hover:bg-white/20"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      
      {showCopiedPopup && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              URL copied to clipboard!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
