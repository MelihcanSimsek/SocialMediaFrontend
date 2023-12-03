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
  constructor(private sanitizer: DomSanitizer,
    private postService:PostService,
    private reportService:ReportService,
    private toastService:ToastrService,
    private authService:AuthService) {
        
  }

  ngOnInit(): void {
    initFlowbite();

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
}
