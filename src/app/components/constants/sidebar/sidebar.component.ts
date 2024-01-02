import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/entities/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Modal,initFlowbite } from 'flowbite';
import { UserModel } from 'src/app/models/auth/userModel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  postImage:any = undefined;
  postarea:string = "";
  user:UserModel;
  constructor(
    private sanitizer: DomSanitizer,
    private toastrService:ToastrService,
    private postService:PostService,
    private authService:AuthService) {
    
    
  }

  ngOnInit(): void {
    initFlowbite();
    this.getUser();
  }

  OpenPostModal()
  {
    let modal =new Modal(document.getElementById("post-modal")); 
    modal.show();
  }

  ClosePostModal(){
    let modal = new Modal(document.getElementById("post-modal"));
    modal.hide();
  }

  getUser()
  {
    this.user =  this.authService.getUserInfo();
  }

  photoFileClick()
  {
    document.getElementById("post-image-file").click();
  }

  postImageSelected(event:any)
  {
    if (event.target.files && event.target.files.length) {
      this.postImage = event.target.files[0];
      
    }
  }

  getPostImage()
  {
    const imageUrl = URL.createObjectURL(this.postImage);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  deleteImage()
  {
    this.postImage = undefined;
  }

  Post(parentid:number = 0)
  {
    if(this.postImage != undefined)
    {
      if(this.postarea.length > 0)
      {
        let post:Post = Object.assign({},{
          id:null,
          userId:this.authService.getUserInfo().id,
          parentId:parentid,
          message:this.postarea,
          imagePath:"",
          type:2,
          creationDate:null
        });

        this.postService.Add(this.postImage,post).subscribe(response=>{
          this.postImage = undefined;
          this.postarea = "";
          this.toastrService.info("Paylaşım yapıldı..");
          location.reload();
        },responseError=>{
          this.postImage = undefined;
          this.postarea = "";
          this.toastrService.error();
        })
      }
      else{
        let post:Post = Object.assign({},{
          id:null,
          userId:this.authService.getUserInfo().id,
          parentId:parentid,
          message:this.postarea,
          imagePath:"",
          type:3,
          creationDate:null
        });
        this.postService.Add(this.postImage,post).subscribe(response=>{
          this.postImage = undefined;
          this.postarea = "";
          this.toastrService.info("Paylaşım yapıldı..");
          location.reload();
        },responseError=>{
          this.postImage = undefined;
          this.postarea = "";
          this.toastrService.error();
        })
      }
    }
    else{
      if(this.postarea.length > 0)
      {
        let post:Post = Object.assign({},{
          id:null,
          userId:this.authService.getUserInfo().id,
          parentId:parentid,
          message:this.postarea,
          imagePath:"",
          type:1,
          creationDate:null
        });

        this.postService.Add(null,post).subscribe(response=>{
          this.postImage = undefined;
          this.postarea = "";
          this.toastrService.info("Paylaşım yapıldı..");
          location.reload();
        },responseError=>{
          this.postImage = undefined;
          this.postarea = "";
          this.toastrService.error();
        })
      }
      else{
        this.toastrService.error("Lütfen düşünceleriniz paylaşın..");
      }
    }
  }

  
}
