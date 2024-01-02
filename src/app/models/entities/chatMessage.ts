export interface ChatMessage{
    id:string;
    userId:number;
    chatId:string;
    content:string | null;
    imagePath:string|null;
    type:number;
    creationDate:Date;
    seenAt:Date| null;
}