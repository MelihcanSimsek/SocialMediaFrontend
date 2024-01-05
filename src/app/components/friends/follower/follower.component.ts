import { Component, Input, OnInit } from '@angular/core';
import { UserFollowerDto } from 'src/app/models/dtos/userFollowerDto';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit{

  @Input() followerFilter:string;
  followerList:UserFollowerDto[];
  followedList:UserFollowerDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  constructor(private authService:AuthService,
    private followerService:FollowerService) {
    
    
  }

  ngOnInit(): void {
    this.GetAllUserFollowed(this.authService.getUserInfo().id);
    this.GetAllUserFollower(this.authService.getUserInfo().id);

  }

  GetAllUserFollower(id:number)
  {
    this.followerService.GetAllFollowerListWithoutFriends(id).subscribe(response=>{
      this.followerList = response.data;
    })
  }


  GetAllUserFollowed(id:number)
  {
    this.followerService.GetAllFollowedListWithoutFriends(id).subscribe(response=>{
      this.followedList = response.data;
    })
  }

  GetUserAvatar(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg';
  }
}
