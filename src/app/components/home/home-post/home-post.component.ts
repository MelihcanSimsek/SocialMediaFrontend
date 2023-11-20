import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit {

  commentImage:{image:any,id:number} = undefined;
  postDetail:PostDetailDto[];
  imageUrl = "https://localhost:7223/Uploads/images/"
  constructor(private sanitizer: DomSanitizer,
    private postService:PostService) {
        
  }

  ngOnInit(): void {
    this.getAllPostDetail();
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
}
