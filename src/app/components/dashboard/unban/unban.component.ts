import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserBanDto } from 'src/app/models/dtos/userBanDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-unban',
  templateUrl: './unban.component.html',
  styleUrls: ['./unban.component.css']
})
export class UnbanComponent implements OnInit {

  bannedFilter:string;
  bannedUsers:UserBanDto[];
  imageUrl:string = 'https://localhost:7223/Uploads/images/'
  constructor(private userService:UserService,
    private toastrService:ToastrService) {
        
  }

  ngOnInit(): void {
    this.getBannedUsers();
  }

  getBannedUsers()
  {
    this.userService.GetBannedUsers().subscribe(response=>{
      this.bannedUsers = response.data;
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


  Unban(user:UserBanDto)
  {
    this.userService.Unban(user.userId).subscribe(response=>{
      this.bannedUsers.splice(this.bannedUsers.indexOf(user),1);
      this.toastrService.info("Kullanıcı yasağı kaldırıldı..","İşlem Başarılı")
    })
  }
}
