import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDetailDto } from 'src/app/models/dtos/postDetailDto';
import { Profile } from 'src/app/models/entities/profile';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ReportService } from 'src/app/services/report.service';

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
  constructor(private authService:AuthService,
    private postService:PostService,
    private reportService:ReportService,
    private activatedRouter:ActivatedRoute,
    private profileService:ProfileService) {
    
    
  }


  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.userid = Number(params["profileid"]);
      this.getUserPosts(this.userid);
      this.PostState = 1;
      this.getUserComments(this.userid);
      this.getUserFavPosts(this.userid);
      

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
}
