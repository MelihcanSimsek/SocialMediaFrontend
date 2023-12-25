export interface ChatProfileDto{
    userId:number;
    chatId:string;
    name:string;
    profileImage:string | null;
    lastMessage:string | null;
    lastMessageType:string | null;
    lastMessageDate:Date | null;    
}

// public int UserId { get; set; }
// public Guid ChatId { get; set; }
// public string Name { get; set; }
// public string? ProfileImage { get; set; }
// public string? LastMessage { get; set; }
// public int? LastMessageType { get; set; }
// public DateTime? LastMessageDate { get; set; }