import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportDetailDto } from 'src/app/models/dtos/reportDetailDto';
import { Post } from 'src/app/models/entities/post';
import { UserReport } from 'src/app/models/entities/userReport';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ReportService } from 'src/app/services/report.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  
  userReports:ReportDetailDto[];
  imageUrl:string = 'https://localhost:7223/Uploads/images/'
  constructor(private authService:AuthService,
    private roleService:RoleService,
    private reportService:ReportService,
    private toastrService:ToastrService,
    private userService:UserService,
    private postService:PostService) {
    
    
  }

  ngOnInit(): void {
    
    this.getAllUserReports();
  }

 

  getAllUserReports()
  {
    this.reportService.GetAllUserReports().subscribe(response=>{
      this.userReports = response.data;
      console.log(this.userReports);
    })
  }

  getUserProfileImage(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg'
  }


  getUserContentImage(image:string)
  {
    return this.imageUrl + image;
  }

  Ban(report:ReportDetailDto)
  {
    this.userService.Ban(report.reportedUserId).subscribe(response=>{
      this.userReports = this.userReports.filter(r => r.reportedUserId !== report.reportedUserId);
      this.toastrService.success("Kullanıcı yasaklandı !");
    },responseError=>{
      console.log(responseError);
    })
  }
  
  PostDelete(report:ReportDetailDto)
  {
    let post:Post = Object.assign({},{
      id:report.reportedContentId,
      userId:0,
      parentId:0,
      message:report.reportedContentMessage,
      imagePath:report.reportedContentImagePath,
      type:report.reportedContentType,
      creationDate:report.reportedContentCreationDate,
    })
    this.postService.Delete(post).subscribe(response=>{
      let userReport:UserReport = Object.assign({},{
        id:0,
        userId:0,
        postId:report.reportedContentId,
        reportId:0
      })
      this.reportService.DeleteUserReport(userReport).subscribe(newResponse=>{
        this.userReports.splice(this.userReports.indexOf(report),1);
        this.toastrService.success("Gönderi silindi.");
      })
    })
  }

  ReportClose(report:ReportDetailDto)
  {
    let userReport:UserReport = Object.assign({},{
      id:0,
      userId:0,
      postId:report.reportedContentId,
      reportId:0
    })
    this.reportService.DeleteUserReport(userReport).subscribe(newResponse=>{
      this.userReports.splice(this.userReports.indexOf(report),1);
      this.toastrService.info("Bildirim kaldırıldı.");
    })
  }

}
