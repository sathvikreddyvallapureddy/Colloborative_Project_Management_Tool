import Chat from "../models/Chat.js";
import User from "../models/user.js";

export const accessChat = async (req, res) => {
  const { otherUserId } = req.body;
  if (!otherUserId) {
    return res
      .status(400)
      .json({ status: false, message: "userId param not sent with request" });
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.userId } } },
      { users: { $elemMatch: { $eq: otherUserId } } },
    ],
  });
  // .populate("users", "name")
  // .populate("latestMessage")
  // .populate({
  //   path: "latestMessage.sender",
  //   select: "name email",
  // });

  if (isChat.length > 0) {
    res.send(isChat[0]);
    console.log("isChat[0]:", isChat[0]);
  } else {
    const otherUser = await User.findById(otherUserId);
    console.log(otherUser);
    var chatData = {
      chatName: otherUser.name,
      isGroupChat: false,
      users: [req.user.userId, otherUserId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "name"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

export const fetchChat = async (req, res) => {
  const userId = req.user.userId;
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate("users", "name")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .populate({
        path: "users",
        select: "name email",
      });
    res.status(200).json(chats);
    console.log(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
