export interface Profile{
    id:number;
    userId:number;
    profileImage:string |null;
    backgroundImage:string | null;
    location:string|null;
    description:string|null;
    status:number;

}


// public int Id { get; set; }
// public int UserId { get; set; }
// public string? ProfileImage { get; set; }
// public string? BackgroundImage { get; set; }
// public string? Location { get; set; }
// public string? Description { get; set; }
// public int Status { get; set; }