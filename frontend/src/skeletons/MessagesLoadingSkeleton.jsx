import React from "react";

const MessagesLoadingSkeleton = () => {
  const items = Array(7).fill(0); 

  return (
    <div className="p-4 space-y-4">
      {items.map((_, idx) => {
        const isSender = idx % 2 === 0; 

        return (
          <div
            key={idx}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-3 animate-pulse ${
                isSender
                  ? "bg-blue-200 rounded-br-none"
                  : "bg-gray-300 rounded-bl-none"
              }`}
            >
              <div className="h-3 bg-white/60 rounded w-32 mb-2"></div>
              <div className="h-3 bg-white/60 rounded w-20"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesLoadingSkeleton;
