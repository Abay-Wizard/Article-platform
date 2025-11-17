import React, { useEffect } from "react";
import { articleStore } from "../store/articleStore";
import DateConverter from "../lib/DateConverter";
import { Loader2 } from "lucide-react";

const Articles = () => {
  const { fetchArticles, articles, isFetchingArticles } = articleStore();

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="w-full flex justify-center mt-12 px-4 md:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 space-y-6">
        <h2 className="text-2xl md:text-3xl italic font-semibold text-purple-700 mb-6">
          Latest Articles
        </h2>

        {isFetchingArticles ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          articles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    article.userId?.profilePic ||
                    "https://via.placeholder.com/50x50.png?text=User"
                  }
                  alt={article.userId?.fullName || "User"}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-gray-800">
                    {article.userId?.fullName || "Unknown User"}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {article.userId?.profession || "No profession listed"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {DateConverter(article.createdAt)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {article.title}
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                  {article.content}
                </p>
              </div>

              {article.category && (
                <div className="mt-3">
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              )}

              {article.images && article.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {article.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-44 sm:h-52 rounded-lg overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`article-img-${idx}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Articles;
