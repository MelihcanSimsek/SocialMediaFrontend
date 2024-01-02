import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown,initFlowbite } from 'flowbite';
import { UserModel } from 'src/app/models/auth/userModel';
import { SocketNotificationModel } from 'src/app/models/dtos/socketNotificationModel';
import { UserNotificationDto } from 'src/app/models/dtos/userNotificationDto';
import { UserProfileDto } from 'src/app/models/dtos/userProfileDto';
import { Notification } from 'src/app/models/entities/notification';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { SignalService } from 'src/app/services/signal.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
 
export class HeaderComponent implements OnInit {
  
  user:UserModel;
  notificationNumber = 99;
  profile:UserProfileDto;
  imageUrl = "https://localhost:7223/Uploads/images/"
  dashboardRole:boolean;
  notifications:UserNotificationDto[];
  notificationDropdownVisible:boolean = false;
  constructor(private authService:AuthService,
    private localStorageService:LocalstorageService,
    private router:Router,
    private profileService:ProfileService,
    private roleService:RoleService,
    private notificationService:NotificationService,
    private signalService:SignalService) {}

  ngOnInit(): void {
    initFlowbite();
    this.getUserProfile();
    this.getUserInfo();
    this.GetUserNotifications();
    this.signalService.notificationReceived.subscribe((item:SocketNotificationModel) => {
      // Check if the received userId matches the current user's id
      if (this.authService.getUserInfo().id === item.id) {
        this.handleReceivedNotification(item);
      }
    });
    
  }

  test()
  {
    const dropdown = document.getElementById('notification-dropdown');
    this.notificationDropdownVisible = !this.notificationDropdownVisible;
    if(this.notificationDropdownVisible)
    {
      dropdown.classList.remove('hidden');
    }
    else{
      dropdown.classList.add('hidden');
    }
  }

  handleReceivedNotification(item:SocketNotificationModel)
  {
    this.notificationService.GetAllNotificationByUserId(item.id).subscribe(response=>{
      this.notifications = response.data;
    })
  }

  GetUserNotifications()
  {
    this.notificationService.GetAllNotificationByUserId(this.authService.getUserInfo().id).subscribe(response=>{
      console.log(response.data);
      this.notifications = response.data;
    })
  }

  DeleteNotificationById(notification:Notification)
  {
    this.notificationService.UpdateReadStateByNotificationId(notification.id).subscribe(response=>{
      if(notification.type == 1)
      {
        this.router.navigate(["profile/"+notification.userId]);
      }
      else if(notification.type == 2)
      {
        this.router.navigate(["profile/"+notification.userId]);
      }
      else if(notification.type == 3)
      {
        this.router.navigate(["posts/"+notification.notificationIntId]);
  
      }
      else if(notification.type == 4)
      {
        this.router.navigate(["posts/"+notification.notificationIntId]);
      }
      else if(notification.type == 5)
      {
        sessionStorage.setItem("chat",notification.notificationUniqueId);
        this.router.navigate(["messages"]);
      }
    })
  
  }

  DeleteAllNotification()
  {
    
    this.notificationService.UpdateAllReadStateByUserId(this.authService.getUserInfo().id).subscribe(response=>{
     
      if(response.success)
      {
        this.notificationService.GetAllNotificationByUserId(this.authService.getUserInfo().id).subscribe(newResponse=>{
          this.notifications = null;
          this.notifications = newResponse.data;
        })
      }
    })
  }



  getUserInfo()
  {
    this.user =  this.authService.getUserInfo();
    this.checkUserRole(this.user.roles);
  }

  getUserProfile()
  {
    this.profileService.getUserProfile(this.authService.getUserInfo().id).subscribe(response=>{
      this.profile = response.data;
    })
  }

  checkUserRole(roles:string[])
  {
  this.dashboardRole = this.roleService.checkRolesForAdmin(roles);
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
