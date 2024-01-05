export interface NotificationSetting{
    id:string;
    userId:number;
    followNotification:boolean;
    unfollowNotification:boolean;
    commentNotification:boolean;
    favNotification:boolean;
    messageNotification:boolean;
}