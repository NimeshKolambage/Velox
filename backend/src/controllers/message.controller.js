import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getUsersForSidebar = async (req, res) => {
    try {
       const loggedUserId = req.user._id;
       const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
       res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Server error" });
    }

};

 
export const getMessage = async (req, res) => {
    try {

        const{id:userToChatWith}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatWith},
                {senderId:userToChatWith,receiverId:myId}
            ],
        });

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const sendMessage=async(req,res)=>{
    try {
       const {text,image}=req.body;
       const {id:receiver}=req.params;
       const senderId=req.user._id;

       let imageUrl;
         if(image){ 
            const uploadResult=await cloudinary.uploader.upload(image);
            imageUrl=uploadResult.secure_url;
         }
         const newMessage=new Message({
                senderId,
                receiverId:receiver,
            text,
            image:imageUrl
         });
            await newMessage.save();
            res.status(201).json(newMessage);

    }catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }

}