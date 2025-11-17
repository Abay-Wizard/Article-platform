import React from "react";

const LeftSideChatSkeleton = () => {
  const items = Array(6).fill(0);

  return (
    <div className="space-y-3 p-2">
      {items.map((_, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-3 p-3 rounded-xl bg-gray-200 animate-pulse"
        >
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>

          <div className="flex-1">
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSideChatSkeleton;
