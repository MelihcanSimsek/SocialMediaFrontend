import { Component, OnInit } from '@angular/core';
import { UserFollowerDto } from 'src/app/models/dtos/userFollowerDto';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit{

  friendsList:UserFollowerDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  constructor(private authService:AuthService,
    private followerService:FollowerService) {
    
    
  }

  ngOnInit(): void {
    this.GetAllUserFriends(this.authService.getUserInfo().id);
  }


  GetAllUserFriends(id:number)
  {
    this.followerService.GetAllUserFriends(id).subscribe(response=>{
      this.friendsList = response.data;
    })
  }


  getUserAvatar(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg';
  }
}
