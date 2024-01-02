import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { Notification } from 'src/app/models/entities/notification';
import { Post } from 'src/app/models/entities/post';
import { Report } from 'src/app/models/entities/report';
import { UserReport } from 'src/app/models/entities/userReport';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { ReportService } from 'src/app/services/report.service';
import { SignalService } from 'src/app/services/signal.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  imageUrl = "https://localhost:7223/Uploads/images/"
  postid:number;
  post:PostDetailDto;
  commentPostDetailDto:PostDetailDto[];
  commentImage:any = undefined;
  commentArea:string = "";
  reports:Report[];
  constructor(private postService:PostService,
    private activatedRouter:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastrService:ToastrService,
    private authService:AuthService,
    private reportService:ReportService,
    private notificationService:NotificationService,
    private signalrService:SignalService) {
     
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.postid = Number(params["postid"]);
      this.getMainPost(this.postid);
      this.getCommentsPost(this.postid);
      this.getAllReports();
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
 });
    })
  }
  
  getAllReports()
  {
    this.reportService.GetAllReports().subscribe(response=>{
      this.reports = response.data;
    })
  }

  getMainPost(id:number)
  {
    this.postService.getPostDetailById(id).subscribe(response=>{
      this.post = response.data;
    })
  }

  getCommentsPost(id:number)
  {
    this.postService.getAllCommentByPostId(id).subscribe(response=>{
      this.commentPostDetailDto = response.data;
    })
  }


  getPostContentImage(image:string)
  { 
  return this.imageUrl + image;
  }


  getUserProfileImage(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg'
  }


  commentPhotoFileClick()
  {
    document.getElementById("comment-image-file").click();
  }

  commentPostImageSelected(event:any)
  {
    if (event.target.files && event.target.files.length) {
      this.commentImage = event.target.files[0];
    }
  }


  commentGetPostImage()
  {
    const imageUrl = URL.createObjectURL(this.commentImage);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  commentDeleteImage()
  {
    this.commentImage = undefined;
  }

  Comment(parentid:number,userId:number)
  {
    const entity:Notification = Object.assign({},{
      id:uuidv4(),
      userId:this.authService.getUserInfo().id,
      targetId:userId,
      notificationIntId:parentid,
      notificationUniqueId:null,
      type:4,
      creationDate:new Date(),
      isRead:false
    });
    
    if(this.commentImage != undefined)
    {
      if(this.commentArea.length > 0)
      {
        let post:Post = Object.assign({},{
          id:null,
          userId:this.authService.getUserInfo().id,
          parentId:parentid,
          message:this.commentArea,
          imagePath:"",
          type:2,
          creationDate:null
        });

        this.postService.Add(this.commentImage,post).subscribe(response=>{
          this.commentImage = undefined;
          this.commentArea = "";
          this.toastrService.info("Paylaşım yapıldı..");
          if(this.authService.getUserInfo().id != userId)
          {
            this.notificationService.Add(entity).subscribe(newResponse=>{
              this.signalrService.SendNotification(userId);
              location.reload(); 
            })  
          }
          else
          {
            location.reload(); 
          }     
        },responseError=>{
          this.commentImage = undefined;
          this.commentArea = "";
          this.toastrService.error();
        })
      }
      else{
        let post:Post = Object.assign({},{
          id:null,
          userId:this.authService.getUserInfo().id,
          parentId:parentid,
          message:this.commentArea,
          imagePath:"",
          type:3,
          creationDate:null
        });
        this.postService.Add(this.commentImage,post).subscribe(response=>{
          this.commentImage = undefined;
          this.commentArea = "";
          this.toastrService.info("Paylaşım yapıldı..");

          if(this.authService.getUserInfo().id != userId)
          {
            this.notificationService.Add(entity).subscribe(newResponse=>{
              this.signalrService.SendNotification(userId);
              location.reload(); 
            })  
          }
          else
          {
            location.reload(); 
          }
          
          
        },responseError=>{
          this.commentImage = undefined;
          this.commentArea = "";
          this.toastrService.error();
        })
      }
    }
    else{
      if(this.commentArea.length > 0)
      {
        let post:Post = Object.assign({},{
          id:null,
          userId:this.authService.getUserInfo().id,
          parentId:parentid,
          message:this.commentArea,
          imagePath:"",
          type:1,
          creationDate:null
        });

        this.postService.Add(null,post).subscribe(response=>{
          this.commentImage = undefined;
          this.commentArea = "";
          this.toastrService.info("Paylaşım yapıldı..");
          if(this.authService.getUserInfo().id != userId)
          {
            this.notificationService.Add(entity).subscribe(newResponse=>{
              this.signalrService.SendNotification(userId);
              location.reload(); 
            })  
          }
          else
          {
            location.reload(); 
          }
        },responseError=>{
          this.commentImage = undefined;
          this.commentArea = "";
          this.toastrService.error();
        })
      }
      else{
        this.toastrService.error("Lütfen düşünceleriniz paylaşın..");
      }
    }
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
      this.toastrService.info("Kullanıcı ve gönderi içeriği bildirilmiştir...");
    },responseError=>{
      this.toastrService.error(responseError.error.message);
    })
  }

}
