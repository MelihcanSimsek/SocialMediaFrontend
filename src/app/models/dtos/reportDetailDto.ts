export interface ReportDetailDto{
    reportedContentId:number;
    reportedContentMessage:string;
    reportedContentImagePath:string;
    reportedContentCreationDate:Date;
    reportedContentType:number;
    reportedUserId:number;
    reportedUserName:string;
    reportedUserImage:string;
    reportReasons:string[];
    
}
