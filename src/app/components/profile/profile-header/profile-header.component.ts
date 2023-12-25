import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserProfileDto } from 'src/app/models/dtos/userProfileDto';
import { Follower } from 'src/app/models/entities/follower';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Modal, initFlowbite } from 'flowbite';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/entities/profile';
import { UserService } from 'src/app/services/user.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  currentUserId:number;
  profile:UserProfileDto;
  imageUrl = "https://localhost:7223/Uploads/images/";
  followerIds:number[];
  followedIds:number[];
  editForm:FormGroup=new FormGroup({
    username:new FormControl("",Validators.required),
    description:new FormControl(""),
    location:new FormControl(""),
  });
  editedBackgorundImage:string;
  editedAvatarImage:string;
  newProfileImage:any = undefined;
  newBackgroundImage:any = undefined;
  
  constructor(private profileService:ProfileService,
    private activatedRoute:ActivatedRoute,
    private followerService:FollowerService,
    private authService:AuthService,
    private sanitizer: DomSanitizer,
    private toastrService:ToastrService,
    private userService:UserService,
    private localStorageService:LocalstorageService,
    private chatService:ChatService) {
    
    
  }

  ngOnInit(): void {
    initFlowbite();
    this.activatedRoute.params.subscribe(params =>{
      this.currentUserId = Number(params["profileid"]);
      this.getUserProfile(this.currentUserId);
      this.getUserFollowedIds(this.currentUserId);
      this.getUserFollowerIds(this.currentUserId);
     
    })
  }

  OpenProfileModal()
  {
    let modal = new Modal(document.getElementById('profile-header-modal'))
    modal.show();
  }

  closeProfileModal()
  {
    let modal = new Modal(document.getElementById('profile-header-modal'))
    modal.hide();
  }

  getUserEditBackgroundImage()
  {
    if(this.newBackgroundImage != undefined)
    {
      const imageUrl = URL.createObjectURL(this.newBackgroundImage);
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    else if(this.profile.backgroundImage != null)
    {
      return this.imageUrl + this.profile.backgroundImage;
    }
    return this.imageUrl + 'background_image.jpg';
  }

  getUserEditProfileImage()
  {
    if(this.newProfileImage != undefined)
    {
      const imageUrl = URL.createObjectURL(this.newProfileImage);
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    else if(this.profile.profileImage != null)
    {
      return this.imageUrl + this.profile.profileImage;
    }
    return this.imageUrl + 'profile_image.jpg';
  }

  createEditFrom()
  {
    this.editForm.setValue({
      username:this.authService.getUserInfo().name,
      description:this.profile.description,
      location:this.profile.location,
    })
  }
  
  newBackgroundImageSelected(event:any)
  {
    if (event.target.files && event.target.files.length) {
      this.newBackgroundImage = event.target.files[0];
    }
  }

  openDeleteBackgroundFile()
  {
    if(this.newBackgroundImage != undefined)
    {
      this.newBackgroundImage = undefined;
    }
    else
    {
      document.getElementById("background-image-file").click();
    }
    
  }

  newProfileImageSelected(event:any)
  {
    if (event.target.files && event.target.files.length) {
      this.newProfileImage = event.target.files[0];
    }
  }

  openDeleteProfileFile()
  {
    if(this.newProfileImage != undefined)
    {
      this.newProfileImage = undefined;
    }
    else
    {
      document.getElementById("profile-image-file").click();
    }
    
  }

  UpdateProfile()
  {
    if(this.editForm.valid)
    {
      if(this.editForm.value.username.length > 2)
      {
        let profileEntity:Profile = Object.assign({},{
          id:this.profile.id,
          userId:this.profile.userId,
          profileImage:this.profile.profileImage,
          backgroundImage:this.profile.backgroundImage,
          location:this.editForm.value.location,
          description:this.editForm.value.description,
          status:0
        })

        this.profileService.update(profileEntity).subscribe(response=>{
          if(this.editForm.value.username != this.authService.getUserInfo().name){
            this.userService.ChangeUserName(this.editForm.value.username,this.profile.userId).subscribe(tokenResponse=>{
              this.localStorageService.removeItem("token");
              this.localStorageService.setItem("token",tokenResponse.data.token);
            })
          }

          if(this.newBackgroundImage != undefined)
          {
            this.profileService.updateBackgroundImage(this.newBackgroundImage,profileEntity).subscribe(backgroundResponse=>{
              console.log("background");

            })
          }
          if(this.newProfileImage != undefined)
          {
            this.profileService.updateProfileImage(this.newProfileImage,profileEntity).subscribe(profileResponse=>{
              console.log("profile");
            })
          }
          this.closeProfileModal();
          setTimeout(() => {
            location.reload();
          }, 300);
        })
      }
      else
      {
        this.toastrService.error("Kullanıcı adı en az 3 harfli olmalıdır.","Kullanıcı Adı Hatası");
      }
    }
    else
    {
      this.toastrService.error("Lütfen kullanıcı adını doldurun","Kullanıcı Adı Boş");
    }

  }




  getUserProfile(id:number)
  {
    this.profileService.getUserProfile(id).subscribe(response=>{
      this.profile = response.data;
      this.createEditFrom();
    })
  }

  getUserFollowerIds(id:number)
  {
    this.followerService.GetAllFollowerIdsByUserid(id).subscribe(response=>{
      this.followerIds = response.data;
    })

  }

  getUserFollowedIds(id:number)
  {
    this.followerService.GetAllFollowedIdsByUserid(id).subscribe(response=>{
      this.followedIds = response.data;
    })
  }

  getUserProfileImage(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image
    }
    return this.imageUrl + 'profile_image.jpg'

  }

  getUserBackgroundImage(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image
    }
    return this.imageUrl + 'background_image.jpg'
  }


  CheckFollow()
  {
  
   if(this.followerIds.includes(this.authService.getUserInfo().id))
    {
      return true;
    }
    return false;
  }

  IsOwnProfile()
  {
    if(this.authService.getUserInfo().id == this.currentUserId)
    {
      return true;
    }
    return false;
  }

  Follow()
  {
    const follow:Follower = Object.assign({},{
      id:1,
      followerId:this.authService.getUserInfo().id,
      followedId:this.currentUserId,
      creationDate:new Date()
    });

    this.followerService.add(follow).subscribe(response=>{
      this.followerIds.push(this.authService.getUserInfo().id);
    })
  }

  UnFollow()
  {
    const follow:Follower = Object.assign({},{
      id:1,
      followerId:this.authService.getUserInfo().id,
      followedId:this.currentUserId,
      creationDate:new Date()
    });

    this.followerService.delete(follow).subscribe(response=>{
      this.followerIds.splice(this.followerIds.indexOf(this.authService.getUserInfo().id),1);
    })
  }

  CheckUserIsFriend()
  {
    if(this.followerIds.includes(this.authService.getUserInfo().id) && this.followedIds.includes(this.authService.getUserInfo().id))
    {
      return true;
    }
    return false;
  }

  SendMessage()
  {
    this.chatService.CheckUsersHaveChatRoom(this.authService.getUserInfo().id,this.currentUserId).subscribe(response=>{
      if(response.data.open)
      {

      }
      else{
        
      }
    })
  }
}
