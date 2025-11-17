import Message from "../models/messageModel.js";
import User from '../models/userModel.js'
import cloudinary from "../config/cloudinary.js";
import { io, getSocketId } from '../lib/socket.js'


const getUsersOnChat = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);

  try {
    const chats = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId"
            ]
          }
        }
      }
    ]);

    const ids = chats.map(c => c._id);

    const users = await User.find({ _id: { $in: ids } })
      .select("name username profilePic createdAt");

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No chat users found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat users fetched successfully!",
      data: users
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};





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
    if (newMessage) {
      const socketId = getSocketId(receiverId)
      io.to(socketId).emit('newMessage', newMessage)
    }
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
        { senderId: myId, receiverId:receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

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



export { sendMessage, getMessages, getUsersOnChat }