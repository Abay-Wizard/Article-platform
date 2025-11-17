import React from "react";
import { FaComments } from "react-icons/fa";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
      <div className="bg-gray-200 p-6 rounded-full mb-4">
        <FaComments size={40} className="text-gray-600" />
      </div>

      <h2 className="text-xl font-semibold text-gray-700">
        No conversation selected
      </h2>

      <p className="text-gray-500 mt-2 max-w-[260px]">
        Start chatting by selecting a user from the list on the left.
      </p>
    </div>
  );
};

export default NoChatSelected;
