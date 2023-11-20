import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { UserModel } from 'src/app/models/auth/userModel';
import { Profile } from 'src/app/models/entities/profile';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
 
export class HeaderComponent implements OnInit {
  
  user:UserModel;
  notificationNumber = 99;
  profile:Profile;
  imageUrl = "https://localhost:7223/Uploads/images/"
  constructor(private authService:AuthService,
    private localStorageService:LocalstorageService,
    private router:Router,
    private profileService:ProfileService) {}

  ngOnInit(): void {
    initFlowbite();
    this.getUserProfile();
    this.getUserInfo();
    
    
  }

  getUserInfo()
  {
    this.user =  this.authService.getUserInfo();
  }

  getUserProfile()
  {
    this.profileService.getUserProfile(this.authService.getUserInfo().id).subscribe(response=>{
      this.profile = response.data;
    })
  }


  getUserHeaderPhoto()
  {
    if(this.profile.profileImage != null)
    {
      return this.imageUrl + this.profile.profileImage;
    }
    return this.imageUrl + 'profile_image.jpg';
  }

  signOut()
  {
    this.localStorageService.removeItem("token");
    this.router.navigate(["login"])
  }



 
}
