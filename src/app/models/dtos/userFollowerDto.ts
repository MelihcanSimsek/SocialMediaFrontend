export interface UserFollowerDto{
    userId:number;
    name:string;
    creationDate:Date;
    userStatus:boolean;
    profileImage:string | null;
    profileStatus:number;
}