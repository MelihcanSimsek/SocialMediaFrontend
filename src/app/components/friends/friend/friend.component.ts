import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFollowerDto } from 'src/app/models/dtos/userFollowerDto';
import { UserChat } from 'src/app/models/entities/userChat';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { FollowerService } from 'src/app/services/follower.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit{

  friendsList:UserFollowerDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  constructor(private authService:AuthService,
    private followerService:FollowerService,
    private chatService:ChatService,
    private router:Router) {
    
    
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

  SendMessage(currentUserId:number)
  {
    this.chatService.CheckUsersHaveChatRoom(this.authService.getUserInfo().id,currentUserId).subscribe(response=>{
      if(response.data.open)
      {
        sessionStorage.setItem("chat",response.data.chatId);
        this.router.navigate(["/messages"]);
      }
      else{
        const uuid = uuidv4();
        let firstUserChat:UserChat = Object.assign({},{
          id:0,
          userId:currentUserId,
          chatId:uuid
        });

        let secondUserChat:UserChat = Object.assign({},{
          id:0,
          userId:this.authService.getUserInfo().id,
          chatId:uuid
        });

        this.chatService.ChatUserAdd(firstUserChat).subscribe(response=>{
          this.chatService.ChatUserAdd(secondUserChat).subscribe(response=>{
            sessionStorage.setItem("chat",uuid);
            this.router.navigate(["/messages"]);
          })
        })
      }
    })
  }
}

