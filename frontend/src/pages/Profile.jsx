import React, { useEffect, useRef, useState } from 'react'
import { userStore } from '../store/userStore'
import toast from 'react-hot-toast'
import { Camera } from 'lucide-react'

const Profile = () => {
  const { user, updateProfile, isUpdatingProfile } = userStore()
  const fileUploadRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [data, setData] = useState({
    fullName: '',
    profession: '',
    profilePic: null,
    email: ''
  })

  useEffect(() => {
    if (user) {
      setData(user)
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return toast.error('Please select an image')

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64Image = reader.result
      setPreview(base64Image)
      setData((prev) => ({ ...prev, profilePic: base64Image }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateProfile(data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-purple-100 to-purple-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-purple-100">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={
              preview ||
              user?.profilePic ||
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-md"
          />
          <div
            onClick={() => fileUploadRef.current.click()}
            className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
          >
            <Camera className="text-white w-5 h-5" />
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          {isUpdatingProfile
            ? 'Updating profile...'
            : 'Click the camera icon to change your picture'}
        </p>

        <input
          ref={fileUploadRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={handleChange}
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={data.fullName}
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            onChange={handleChange}
            type="text"
            name="profession"
            placeholder="Profession"
            value={data.profession}
            className="w-full border border-purple-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            disabled
            className="w-full border border-purple-100 rounded-lg p-3 bg-purple-50 text-gray-600"
          />

          <button
            type="submit"
            disabled={isUpdatingProfile}
            className="w-full bg-purple-600 cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
          >
            {isUpdatingProfile ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
