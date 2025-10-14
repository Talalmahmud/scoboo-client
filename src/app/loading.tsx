import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-blue-900 via-green-800 to-black">
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
        <div className="absolute text-white font-semibold tracking-wide animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}
