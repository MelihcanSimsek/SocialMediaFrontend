export interface MessageDto{
    messageId:string;
    chatId:string;
    userId:number;
    name:string;
    content:string | null;
    imagePath:string | null;
    type:number;
    creationDate:Date;
    seenAt:Date | null;
}




