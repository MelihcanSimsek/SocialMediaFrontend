export interface UserNotificationDto{
    id:string;
    userId:number;
    userName:string;
    targetId:number;
    notificationIntId:number | null;
    notificationUniqueId:string | null;
    type:number;
    creationDate:Date;
    isRead:boolean;
}



