export interface ChatProfileDto{
    userId:number;
    chatId:string;
    name:string;
    profileImage:string | null;
    lastMessage:string | null;
    lastMessageType:string | null;
    lastMessageDate:Date | null;    
    notShowedMessagesCount:number;
}

