import model from '../database/models';

class ChatService{
    static async retrieveMessages(){
        let messages = await model.Chat.findAll();
        return messages;
    }

    static async saveMessage(data){
        const message = await model.Chat.create({
            message:data.message
        });
        return message
    }
}

export default ChatService