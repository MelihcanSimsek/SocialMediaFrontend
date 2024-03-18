import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { Fav } from 'src/app/models/entities/fav';
import { Notification } from 'src/app/models/entities/notification';
import { Post } from 'src/app/models/entities/post';
import { PostTag } from 'src/app/models/entities/postTag';
import { Report } from 'src/app/models/entities/report';
import { UserReport } from 'src/app/models/entities/userReport';
import { UserTag } from 'src/app/models/entities/userTag';
import { AuthService } from 'src/app/services/auth.service';
import { FavService } from 'src/app/services/fav.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { ReportService } from 'src/app/services/report.service';
import { SignalService } from 'src/app/services/signal.service';
import { TagService } from 'src/app/services/tag.service';
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
  favs:number[];
  constructor(private postService:PostService,
    private activatedRouter:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastrService:ToastrService,
    private authService:AuthService,
    private reportService:ReportService,
    private notificationService:NotificationService,
    private signalrService:SignalService,
    private clipboardService: ClipboardService,
    private favService:FavService,
    private tagService:TagService
     ) {
     
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.postid = Number(params["postid"]);
      this.getUserFavs();
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
  
  UpdateUserTag(post:PostDetailDto)
  {
    if(post.userId != this.authService.getUserInfo().id)
    {
      const userTag:UserTag = Object.assign({},{
        id:0,
        userId:this.authService.getUserInfo().id,
        postId:post.id,
        label:post.label,
        creationDate:new Date()
      });
  
      this.tagService.AddUserTag(userTag).subscribe();
    }
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
      this.UpdateUserTag(response.data);
    })
  }

  getCommentsPost(id:number)
  {
    this.postService.getAllCommentByPostId(id,this.authService.getUserInfo().id).subscribe(response=>{
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
          this.postService.PredictCategory(post.message).subscribe(newResponse=>{
            let postTag:PostTag = Object.assign({},{
              id:0,
              postId:response.data,
              label:newResponse.category,
              creationDate:new Date()
            })

            this.tagService.AddPostTag(postTag).subscribe(responseNew=>{
              this.commentImage = undefined;
              this.commentArea = "";
              this.toastrService.info("Paylaşım yapıldı..");
              if(this.authService.getUserInfo().id != userId)
              {
                this.notificationService.Add(entity).subscribe(newNotificationResponse=>{
                  this.signalrService.SendNotification(userId);
                  location.reload(); 
                })  
              }
              else
              {
                location.reload(); 
              }   
            });
          });
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
          this.postService.PredictCategory("").subscribe(newResponse=>{
            let postTag:PostTag = Object.assign({},{
              id:0,
              postId:response.data,
              label:newResponse.category,
              creationDate:new Date()
            })

            this.tagService.AddPostTag(postTag).subscribe(responseNew=>{
              this.commentImage = undefined;
              this.commentArea = "";
              this.toastrService.info("Paylaşım yapıldı..");
              if(this.authService.getUserInfo().id != userId)
              {
                this.notificationService.Add(entity).subscribe(newNotificationResponse=>{
                  this.signalrService.SendNotification(userId);
                  location.reload(); 
                })  
              }
              else
              {
                location.reload(); 
              }   
            });
          });

        
          
          
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
          this.postService.PredictCategory(post.message).subscribe(newResponse=>{
            let postTag:PostTag = Object.assign({},{
              id:0,
              postId:response.data,
              label:newResponse.category,
              creationDate:new Date()
            })

            this.tagService.AddPostTag(postTag).subscribe(responseNew=>{
              this.commentImage = undefined;
              this.commentArea = "";
              this.toastrService.info("Paylaşım yapıldı..");
              if(this.authService.getUserInfo().id != userId)
              {
                this.notificationService.Add(entity).subscribe(newNotificationResponse=>{
                  this.signalrService.SendNotification(userId);
                  location.reload(); 
                })  
              }
              else
              {
                location.reload(); 
              }   
            });
          });
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

  getUserFavs()
  {
    this.favService.GetPostCommentsFav(this.authService.getUserInfo().id,this.postid).subscribe(response=>{
      this.favs = response.data;
    })
  }

  favClick(postId:number,postUserId:number,Label:string)
  {
    let entity:Fav = Object.assign({},{
      id:0,
      userId:this.authService.getUserInfo().id,
      postId:postId,
      creationDate:new Date()
    })

    const notification:Notification = Object.assign({},{
      id:uuidv4(),
      userId:this.authService.getUserInfo().id,
      targetId:postUserId,
      notificationIntId:postId,
      notificationUniqueId:null,
      type:3,
      creationDate:new Date(),
      isRead:false
    });

    if(!this.favs.includes(postId))
    {
      this.favs.push(postId);
      this.favService.add(entity).subscribe(response=>{
        this.notificationService.Add(notification).subscribe(newResponse=>{
          this.signalrService.SendNotification(postUserId);
        })
      })
    }
    else{
      this.favs.splice(this.favs.indexOf(postId),1);
      this.favService.delete(entity).subscribe(response=>{

      })
    }

    if(postUserId != this.authService.getUserInfo().id)
    {
      const userTag:UserTag = Object.assign({},{
        id:0,
        userId:this.authService.getUserInfo().id,
        postId:postId,
        label:Label,
        creationDate:new Date()
      })
  
      this.tagService.AddUserTag(userTag).subscribe();
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
    this.toastrService.success("Gönderi bağlantısı kopyalandı");
  }
}
