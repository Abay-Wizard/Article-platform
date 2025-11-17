import React, { useEffect } from 'react'
import { articleStore } from '../store/articleStore'
import DateConverter from '../lib/DateConverter'
import { useNavigate } from 'react-router-dom'
import { Edit, Trash2 } from 'lucide-react'

const UserArticles = () => {
  const { userArticles, getUserArticles, deleteArticle } = articleStore()
  const navigate = useNavigate()

  useEffect(() => {
    getUserArticles()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await deleteArticle(id)
    }
  }

  return (
    <section className="max-w-5xl mt-8 mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center">
        My Articles
      </h2>

      {userArticles.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t posted any articles yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userArticles.map((article) => (
            <div
              key={article._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200 flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col grow">
                {/* Title and Actions */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {article.title}
                  </h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/update-article/${article._id}`)}
                      className="text-gray-500 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {article.content}
                </p>

                {/* Date */}
                <div className="text-gray-500 text-xs">
                  {DateConverter(article.createdAt)}
                </div>
              </div>

              {/* Image */}
              {article.images?.length > 0 && (
                <img
                  src={article.images[0]}
                  alt={article.title}
                  className="w-full h-56 object-cover rounded-b-xl mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default UserArticles
