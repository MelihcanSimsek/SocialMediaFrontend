import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { PostService } from 'src/app/services/post.service';
import { initFlowbite } from 'flowbite';
import { UserReport } from 'src/app/models/entities/userReport';
import { ReportService } from 'src/app/services/report.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/models/entities/report';
import { AuthService } from 'src/app/services/auth.service';
import { ClipboardService } from 'ngx-clipboard';
import { FavService } from 'src/app/services/fav.service';
import { Fav } from 'src/app/models/entities/fav';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from 'src/app/models/entities/notification';
import { NotificationService } from 'src/app/services/notification.service';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit {

  commentImage:{image:any,id:number} = undefined;
  postDetail:PostDetailDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  reports:Report[];
  favs:number[];
  constructor(private sanitizer: DomSanitizer,
    private postService:PostService,
    private reportService:ReportService,
    private toastService:ToastrService,
    private authService:AuthService,
    private clipboardService: ClipboardService,
    private favService:FavService,
    private notificationService:NotificationService,
    private signalR:SignalService) {
        
  }

  ngOnInit(): void {
    initFlowbite();
    this.getUserFavs();
    this.getAllReports();
    this.getAllPostDetail();
  }


  getAllReports()
  {
    this.reportService.GetAllReports().subscribe(response=>{
      this.reports = response.data;
    })
  }

  getAllPostDetail()
  {
    this.postService.getAllPostDetail().subscribe(response=>{

      this.postDetail = response.data;
    })
  }

  getPostContentImage(image:string)
  { 
  return this.imageUrl + image;
  }

  commentPhotoFileClick()
  {
    document.getElementById("comment-image-file").click();
  }

  commentPostImageSelected(event:any,id:number)
  {
    if (event.target.files && event.target.files.length) {
      this.commentImage.image = event.target.files[0];
      this.commentImage.id = id;
    }
  }


  commentGetPostImage()
  {
    const imageUrl = URL.createObjectURL(this.commentImage.image);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  commentDeleteImage()
  {
    this.commentImage = undefined;
  }

  getUserProfileImage(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg'
  }




  report(reportId:number,postId:number)
  {
    let userReport:UserReport = Object.assign({},{
      id:0,
      userId:this.authService.getUserInfo().id,
      postId:postId,
      reportId:reportId
    })
    
    this.reportService.AddUserReport(userReport).subscribe(response=>{
      this.toastService.info("Kullanıcı ve gönderi içeriği bildirilmiştir...");
    },responseError=>{
      this.toastService.error(responseError.error.message);
    })

    
  }

  getUserFavs()
  {
    this.favService.GetUserFavs(this.authService.getUserInfo().id).subscribe(response=>{
      this.favs = response.data;
    })
  }

  favClick(id:number,postUserId:number)
  {
    let entity:Fav = Object.assign({},{
      id:0,
      userId:this.authService.getUserInfo().id,
      postId:id,
      creationDate:new Date()
    })

    const notification:Notification = Object.assign({},{
      id:uuidv4(),
      userId:this.authService.getUserInfo().id,
      targetId:postUserId,
      notificationIntId:id,
      notificationUniqueId:null,
      type:3,
      creationDate:new Date(),
      isRead:false
    });


   

    if(!this.favs.includes(id))
    {
      this.favs.push(id);
      this.favService.add(entity).subscribe(response=>{
        this.notificationService.Add(notification).subscribe(newResponse=>{
          this.signalR.SendNotification(postUserId);
        })
      })
    }
    else{
      this.favs.splice(this.favs.indexOf(id),1);
      this.favService.delete(entity).subscribe(response=>{

      })
    }
  }

  getPostFavCount(id:number,count:number,favArray:number[]){

    if(this.favs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count;
    }
    else if(!this.favs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count - 1;
    }
    else if(this.favs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  getFavClass(id:number)
  {
    
    if(this.favs.includes(id))
    {
      return "cursor-pointer  text-red-700"
    }
    else
    {
      return "cursor-pointer text-slate-700 hover:text-slate-500 dark:text-white dark:hover:text-secondary-color-extra-light"
    }
  }

  copy(id:number){
    let postUrl = "http://localhost:4200/posts/"+id;
    this.clipboardService.copyFromContent(postUrl);
    this.toastService.success("Gönderi bağlantısı kopyalandı");
  }
}
