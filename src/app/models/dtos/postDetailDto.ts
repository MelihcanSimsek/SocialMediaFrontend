export interface PostDetailDto{
    id:number;
    userId:number;
    name:string;
    status:boolean;
    profileImage:string | null;
    fav:number[];
    comment:number;
    parentId:number;
    message:string |null;
    imagePath:string | null;
    type:number;
    creationDate:Date;

}

