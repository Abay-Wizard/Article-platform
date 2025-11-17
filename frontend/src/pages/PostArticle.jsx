import React, { useRef, useState } from "react";
import { articleStore } from "../store/articleStore";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

const PostArticle = () => {
    const { postArticle, isPostingArticle } = articleStore();
    const filesUploadRef = useRef(null);
    const [previews, setPreviews] = useState([]);
    const [data, setData] = useState({
        category: "",
        title: "",
        content: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagesUpload = (e) => {
        const files = Array.from(e.target.files);//btw an empty array in JS is true, that's why I am using !files.length instead of just !files
        if (!files.length) {
            return toast.error("You need to upload valid files!");

        }

        try {
            const readers = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => resolve(reader.result)
                    reader.onerror = (err) => reject(err)
                })
            })

            Promise.all(readers).then((base64Images) => {
                setPreviews((prev) => ([...prev, ...base64Images]))
                setData((prev) => ({ ...prev, images: [...prev.images, ...base64Images] }))
            })
        } catch (error) {
            console.log(error?.message)
            toast.error('Error uploading files!')
        }
    };


    const removeImage = (index) => {
        const newPreviews = [...previews];//we just make a copy of each
        const newImages = [...data.images];
        newPreviews.splice(index, 1);
        newImages.splice(index, 1);
        setPreviews(newPreviews);
        setData((prev) => ({ ...prev, images: newImages }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.title || !data.content || !data.category) {
            toast.error("Please fill all required fields!");
            return;
        }
        await postArticle(data);
        setData({
            category: "",
            title: "",
            content: "",
            images: [],
        })
        setPreviews([])
    };

    return (
        <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-600">
                Create a Post
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <textarea
                    name="content"
                    placeholder="Content"
                    value={data.content}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />

                <select
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Select category</option>
                    <option value="Tech">Tech</option>
                    <option value="Culture">Culture</option>
                    <option value="Politics">Politics</option>
                    <option value="Economics">Economics</option>
                    <option value="Art">Art</option>
                </select>

                <div>
                    <label
                        className="cursor-pointer inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                        htmlFor="images"
                    >
                        Upload Images
                    </label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        ref={filesUploadRef}
                        onChange={handleImagesUpload}
                        className="hidden"
                    />
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-2">
                        {previews.map((img, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 md:w-32 md:h-32 border rounded-md overflow-hidden shadow-md"
                            >
                                <img
                                    src={img}
                                    alt={`preview-${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <X
                                    size={20}
                                    className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 cursor-pointer hover:bg-red-600 shadow"
                                    onClick={() => removeImage(index)}
                                />
                            </div>
                        ))}
                    </div>
                )}


                <button
                    type="submit"
                    disabled={isPostingArticle}
                    className="bg-purple-600 cursor-pointer text-white p-3 rounded-md hover:bg-purple-700 transition mt-4 disabled:bg-purple-300"
                >
                    {isPostingArticle ? "Posting..." : "Post Article"}
                </button>
            </form>
        </div>
    );
};

export default PostArticle;
