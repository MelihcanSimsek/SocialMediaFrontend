export interface Notification{
    id:string;
    userId:number;
    targetId:number;
    notificationIntId:number | null;
    notificationUniqueId:string | null;
    type:number;
    creationDate:Date | null;
    isRead:boolean;
}

