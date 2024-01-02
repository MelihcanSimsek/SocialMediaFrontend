export interface UserBanDto{
    userId:number;
    userName:string;
    imagePath:string | null;
    banDate:Date;
    status:boolean;
}
