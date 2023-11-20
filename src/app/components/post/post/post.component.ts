import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { Post } from 'src/app/models/entities/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

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
  constructor(private postService:PostService,
    private activatedRouter:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastrService:ToastrService,
    private authService:AuthService) {
     
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.postid = Number(params["postid"]);
      this.getMainPost(this.postid);
      this.getCommentsPost(this.postid);
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
 });
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

  Comment(parentid:number)
  {
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

}
