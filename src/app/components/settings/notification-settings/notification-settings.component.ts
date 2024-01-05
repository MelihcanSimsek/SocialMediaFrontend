import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationSetting } from 'src/app/models/entities/notificationSetting';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {

  followNotification:boolean=true;
  unfollowNotification:boolean=true;
  commentNotification:boolean=true;
  favNotification:boolean=true;
  messageNotification:boolean=true;
  notificationSetting:NotificationSetting=null;

  constructor(private notificationService:NotificationService,
    private authService:AuthService,
    private toastService:ToastrService) {
    
  }

  ngOnInit(): void {
    this.getUserNotification();
  }

  getUserNotification()
  {
    this.notificationService.GetNotificationSettingByUserId(this.authService.getUserInfo().id).subscribe(response=>{
      if(response.data != null)
      {
        this.followNotification = response.data.followNotification;
        this.unfollowNotification = response.data.unfollowNotification;
        this.commentNotification = response.data.commentNotification;
        this.favNotification = response.data.favNotification;
        this.messageNotification = response.data.messageNotification;
        this.notificationSetting = response.data;
      }
     
    })
  }


  Save()
  {
    if(this.notificationSetting != null)
    {
      const entity:NotificationSetting = Object.assign({},{
        id:this.notificationSetting.id,
        userId:this.notificationSetting.userId,
        followNotification:this.followNotification,
        unfollowNotification:this.unfollowNotification,
        commentNotification:this.commentNotification,
        favNotification:this.favNotification,
        messageNotification:this.messageNotification
      });

      this.notificationService.UpdateNotificationSettings(entity).subscribe(response=>{
        
        this.toastService.success("Bildirim ayarları kaydedildi.","İşlem Başarılı");
      })
    }
    else
    {
      const entity:NotificationSetting = Object.assign({},{
        id:uuidv4(),
        userId:this.authService.getUserInfo().id,
        followNotification:this.followNotification,
        unfollowNotification:this.unfollowNotification,
        commentNotification:this.commentNotification,
        favNotification:this.favNotification,
        messageNotification:this.messageNotification
      });

      this.notificationService.AddNotificationSettings(entity).subscribe(response=>{
        
        this.toastService.success("Bildirim ayarları kaydedildi.","İşlem Başarılı");
      })
    }
  }

}
