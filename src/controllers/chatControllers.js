import chatService from "../services/chatServices";

class ChatController{
    static async getAllChatMessages(req,res){
        const messages = await chatService.retrieveMessages();

        return res.status(200).json({status:200, count:messages.length, chats:messages});
        
    }
}

export default ChatController;