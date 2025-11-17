import React, { useEffect, useState } from "react";
import { userStore } from "../store/userStore";
import { Search, X } from "lucide-react";
import ConnectSkeleton from "../skeletons/ConnectSkeleton";
import DateConverter from "../lib/DateConverter";

const Connect = () => {
  const { isFetchingUsers, users, fetchUsers } = userStore();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = searchText
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    : users;

  if (isFetchingUsers) return <ConnectSkeleton />;

  return (
    <div className="min-h-screen mt-5 bg-linear-to-br from-purple-50 to-purple-100 py-16 px-4 sm:px-8 lg:px-16">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 text-center mb-8">
        Connect with Members
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12 relative">
        <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 border border-purple-200 focus-within:ring-2 focus-within:ring-purple-400 transition-all duration-300">
          <Search size={20} className="text-purple-600" />
          <input
            type="text"
            placeholder="Search people..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent outline-none px-3 text-gray-700 text-sm sm:text-base"
          />
          {searchText && (
            <X
              size={20}
              className="text-gray-400 hover:text-red-500 cursor-pointer transition"
              onClick={() => setSearchText("")}
            />
          )}
        </div>
      </div>

      {/* User Cards */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No users found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-transparent hover:border-purple-300"
            >
              <img
                src={
                  user.profilePic ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }
                alt={user.fullName}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-purple-200 hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {user.fullName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{user.profession}</p>
              <p className="text-xs text-gray-400 mt-1">
                Member since {DateConverter(user.createdAt)}
              </p>

              <button
                className="mt-4 px-6 py-2 cursor-pointer rounded-full bg-linear-to-r from-purple-600 to-purple-700 text-white text-sm font-medium shadow hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all"
                onClick={() => console.log(`Message ${user.fullName}`)}
              >
                Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connect;
