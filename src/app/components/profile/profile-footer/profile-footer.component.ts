import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { Fav } from 'src/app/models/entities/fav';
import { Notification } from 'src/app/models/entities/notification';
import { Profile } from 'src/app/models/entities/profile';
import { AuthService } from 'src/app/services/auth.service';
import { FavService } from 'src/app/services/fav.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ReportService } from 'src/app/services/report.service';
import { SignalService } from 'src/app/services/signal.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-profile-footer',
  templateUrl: './profile-footer.component.html',
  styleUrls: ['./profile-footer.component.css']
})
export class ProfileFooterComponent implements OnInit {


  userid:number;
  PostState:Number;
  UserPostDetails:PostDetailDto[];
  UserCommentDetails:PostDetailDto[];
  UserFavDetails:PostDetailDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  postFavs:number[];
  commentFavs:number[];
  favFavs:number[];
  constructor(private authService:AuthService,
    private postService:PostService,
    private reportService:ReportService,
    private activatedRouter:ActivatedRoute,
    private profileService:ProfileService,
    private clipboardService: ClipboardService,
    private toastrService:ToastrService,
    private favService:FavService,
    private notificationService:NotificationService,
    private signalR:SignalService) {
    
    
  }


  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.userid = Number(params["profileid"]);
      this.GetUserPostsFavs();
      this.GetUserCommentsFavs();
      this.GetUserFavPostsFavs();
      this.getUserPosts(this.userid);
      this.PostState = 1;
      this.getUserComments(this.userid);
      this.getUserFavPosts(this.userid);
      

    })
  }

  GetUserPostsFavs()
  {
    this.favService.GetUserPostsFavs(this.authService.getUserInfo().id,this.userid).subscribe(response=>{
      this.postFavs = response.data;
    })
  }

  GetUserCommentsFavs()
  {
    this.favService.GetUserCommentsFavs(this.authService.getUserInfo().id,this.userid).subscribe(response=>{
      this.commentFavs = response.data;
    })
  }

  GetUserFavPostsFavs()
  {
    this.favService.GetUserFavPostsFavs(this.authService.getUserInfo().id,this.userid).subscribe(response=>{
      this.favFavs = response.data;
    })
  }
  

  getUserPosts(id:number)
  {
    this.postService.GetAllUserPosts(id).subscribe(response=>{
      this.UserPostDetails = response.data;
    })
  }

  getUserComments(id:number)
  {
    this.postService.GetAllUserComment(id).subscribe(response=>{
      this.UserCommentDetails = response.data;
    })
  }

  getUserFavPosts(id:number)
  {
    this.postService.GetAllFavedPost(id).subscribe(response=>{
      this.UserFavDetails = response.data;
    })
  }

  favPostClick(id:number,postUserId:number)
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

    if(!this.postFavs.includes(id))
    {
      this.postFavs.push(id);
      this.favService.add(entity).subscribe(response=>{
        this.notificationService.Add(notification).subscribe(newResponse=>{
          this.signalR.SendNotification(postUserId);
        })
      })
    }
    else{
      this.postFavs.splice(this.postFavs.indexOf(id),1);
      this.favService.delete(entity).subscribe(response=>{

      })
    }
  }

  getPostFavCount(id:number,count:number,favArray:number[]){

    if(this.postFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count;
    }
    else if(!this.postFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count - 1;
    }
    else if(this.postFavs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  getPostFavClass(id:number)
  {
    
    if(this.postFavs.includes(id))
    {
      return "icon-text cursor-pointer  text-red-700"
    }
    else
    {
      return "icon-text cursor-pointer text-primary-color-dark hover:text-slate-500 dark:text-white dark:hover:text-secondary-color-extra-light"
    }
  }


  favCommentClick(id:number,postUserId:number)
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

    if(!this.commentFavs.includes(id))
    {
      this.commentFavs.push(id);
      this.favService.add(entity).subscribe(response=>{
         this.notificationService.Add(notification).subscribe(newResponse=>{
          this.signalR.SendNotification(postUserId);
        })
      })
    }
    else{
      this.commentFavs.splice(this.commentFavs.indexOf(id),1);
      this.favService.delete(entity).subscribe(response=>{

      })
    }
  }


  getCommentFavCount(id:number,count:number,favArray:number[]){

    if(this.commentFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count;
    }
    else if(!this.commentFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count - 1;
    }
    else if(this.commentFavs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  getCommentFavClass(id:number)
  {
    
    if(this.commentFavs.includes(id))
    {
      return "icon-text cursor-pointer  text-red-700"
    }
    else
    {
      return "icon-text cursor-pointer text-slate-700 hover:text-slate-500 dark:text-white dark:hover:text-secondary-color-extra-light"
    }
  }



  favFavsClick(id:number,postUserId:number)
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

    if(!this.favFavs.includes(id))
    {
      this.favFavs.push(id);
      this.favService.add(entity).subscribe(response=>{
        this.notificationService.Add(notification).subscribe(newResponse=>{
          this.signalR.SendNotification(postUserId);
        })
      })
    }
    else{
      this.favFavs.splice(this.favFavs.indexOf(id),1);
      this.favService.delete(entity).subscribe(response=>{

      })
    }
  }


  getFavsFavCount(id:number,count:number,favArray:number[]){

    if(this.favFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count;
    }
    else if(!this.favFavs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count - 1;
    }
    else if(this.favFavs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id,favArray))
    {
      return count + 1;
    }
    else{
      return count;
    }
  
  }

  getFavsFavClass(id:number)
  {
    
    if(this.favFavs.includes(id))
    {
      return "icon-text cursor-pointer  text-red-700"
    }
    else
    {
      return "icon-text cursor-pointer text-slate-700 hover:text-slate-500 dark:text-white dark:hover:text-secondary-color-extra-light"
    }
  }


  changePostState(state:number)
  {
    this.PostState = state;
  }

  getPostContentImage(image:string)
  { 
  return this.imageUrl + image;
  }

  getPostProfileImage(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image
    }
    return this.imageUrl + 'profile_image.jpg'
  }

  copy(id:number){
    let postUrl = "http://localhost:4200/posts/"+id;
    this.clipboardService.copyFromContent(postUrl);
    this.toastrService.success("Gönderi bağlantısı kopyalandı");
  }
}
