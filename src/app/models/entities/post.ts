export interface Post{
    id:number;
    userId:number;
    parentId:number;
    message:string;
    imagePath:string;
    type:number;
    creationDate:Date;
}