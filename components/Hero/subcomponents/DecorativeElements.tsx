"use client";

export function DecorativeElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-16 sm:top-24 md:top-32 left-4 sm:left-8 md:left-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-500/15 rounded-full opacity-30 blur-2xl animate-float" />
      <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 right-4 sm:right-8 md:right-16 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-blue-600/10 rounded-full opacity-25 blur-3xl animate-float-delayed" />
    </div>
  );
}
