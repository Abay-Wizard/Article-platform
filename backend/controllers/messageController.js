import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";

const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const senderId = req.user._id; 
  const { id: receiverId } = req.params;

  try {
    
    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, message: "Sender or receiver ID missing!" });
    }

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "You must send either a text or an image!",
      });
    }

    let imageUrl;
    if (image) {
      const cloudResponse = await cloudinary.uploader.upload(image, {
        folder: "messages",
      });
      imageUrl = cloudResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || null,
    });

    await newMessage.save(); 

    // TODO: integrate socket.io emit event here for real-time delivery
    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error(error?.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};



const getMessages = async (req, res) => {
  const myId = req.user._id;
  const { id: receiverId } = req.params;

  try {
    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required!" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // ✅ sort messages oldest → newest

    if (!messages || messages.length === 0) {
      return res.status(404).json({ success: false, message: "No messages found!" });
    }

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully!",
      data: messages,
    });
  } catch (error) {
    console.error(error?.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};



export {sendMessage,getMessages}