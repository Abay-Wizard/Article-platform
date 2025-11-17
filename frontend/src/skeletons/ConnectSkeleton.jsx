import React from "react";

const ConnectSkeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 py-16 px-4 sm:px-8 lg:px-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 text-center mb-10">
        Loading members...
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center animate-pulse"
          >
            <div className="w-24 h-24 rounded-full bg-purple-200 mb-4" />

            <div className="h-4 bg-gray-300 rounded w-2/3 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />

            <div className="h-2 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-8 w-28 bg-purple-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectSkeleton;
