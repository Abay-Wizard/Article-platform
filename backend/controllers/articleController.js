import Article from "../models/articleModel.js";
import cloudinary from "../config/cloudinary.js";

const postArticle = async (req, res) => {
    const { title, content, images,category } = req.body;
    const userId = req.user._id;

    try {
        if (!title || !content ||!category) {
            return res.status(400).json({
                success: false,
                message: "You need title, content, and category to post an article!",
            });
        }

        let imageUrls = [];

        if (images && images.length > 0) {
            // Upload all base64 images in parallel
            const uploadPromises = images.map((img) =>
                cloudinary.uploader.upload(img, { folder: "articles" })
            );
            const results = await Promise.all(uploadPromises);

            imageUrls = results.map((r) => r.secure_url);
        }

        const newArticle = new Article({
            title,
            content,
            userId,
            category,
            images: imageUrls,
        });

        await newArticle.save();

        res.status(201).json({
            success: true,
            message: "Article posted successfully!",
            data: newArticle,
        });
    } catch (error) {
        console.error("Error posting article:", error.message);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
};

const updateArticle = async (req, res) => {
    const { title, content, images,category } = req.body; // `images` are base64 or URLs
    const { id } = req.params;

    try {
        if (!title || !content ||!category) {
            return res.status(400).json({
                success: false,
                message: "You need title, content, and category to update an article!",
            });
        }

        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found!",
            });
        }

        let finalImages = [];
        let existingImages = article.images || [];

        // Separate existing URLs from new base64s
        const existingUrls = images.filter((img) => img.startsWith('http'));
        const newBase64Images = images.filter((img) => !img.startsWith('http'));

        // Upload new images to Cloudinary
        if (newBase64Images.length > 0) {
            const uploadPromises = newBase64Images.map((img) =>
                cloudinary.uploader.upload(img, { folder: 'articles' })
            );
            const results = await Promise.all(uploadPromises);
            const newUrls = results.map((r) => r.secure_url);
            finalImages = [...existingUrls, ...newUrls];
        } else {
            finalImages = existingUrls;
        }

        // Delete images that are no longer present
        const removedImages = existingImages.filter((oldUrl) => !finalImages.includes(oldUrl));
        const deletePromises = removedImages.map(async (url) => {
            const publicId = url.split('/').slice(-1)[0].split('.')[0];
            try {
                await cloudinary.uploader.destroy(`articles/${publicId}`);
            } catch (err) {
                console.warn(`Failed to delete image: ${publicId}`);
            }
        });
        await Promise.all(deletePromises);

        // Update article
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, content, category, images: finalImages },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Article updated successfully!',
            data: updatedArticle,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
};

const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res
                .status(404)
                .json({ success: false, message: "Article not found!" });
        }

        if (article.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ success: false, message: 'Unauthorized user!' })
        }
        if (article.images && article.images.length > 0) {
            const deletePromises = article.images.map(async (url) => {
                const publicId = url.split('/').slice(-1)[0].split('.')[0]
                try {
                    await cloudinary.uploader.destroy(`articles/${publicId}`)
                } catch (error) {
                    console.warn('Deleting image not successfull!')
                }
            })
            await Promise.all(deletePromises)
        }
        await article.deleteOne()


        res.status(200).json({
            success: true,
            message: "Article deleted successfully!",
        });
    } catch (error) {
        console.error("Delete Article Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};

const getUserArticles = async (req, res) => {
    const userId = req.user._id
    try {
        const articles = await Article.find({ userId })
        if (!articles) {
            
            return res.status(404).json({ success: false, message: 'Articles not found!' })
        }
        res.status(200).json({ success: true, message: 'Articles fetched successfully!',data:articles })

    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}


const getAllArticles = async (_, res) => {
    try {
        const articles = await Article.find({})
        if (!articles || articles.length===0) {
            return res.status(404).json({ success: false, message: 'Articles not found!' })
        }
        res.status(200).json({ success: true, message: 'Articles fetched successfully!',data:articles })
    } catch (error) {
        console.log(error?.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}

export { postArticle, updateArticle, getAllArticles, getUserArticles, deleteArticle }
