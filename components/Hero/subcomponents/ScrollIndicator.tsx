"use client";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-blue-500/60 rounded-full flex items-start justify-center p-2 bg-white/40 backdrop-blur-sm">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
