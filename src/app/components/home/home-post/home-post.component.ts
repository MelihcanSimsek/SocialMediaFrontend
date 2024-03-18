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
import { Dictionary } from 'src/app/models/responsemodel/Dictionary';
import { Item } from 'src/app/models/entities/Item';
import { Post } from 'src/app/models/entities/post';
import { CommentItem } from 'src/app/models/entities/commentItem';
import { PostTag } from 'src/app/models/entities/postTag';
import { TagService } from 'src/app/services/tag.service';
import { UserTag } from 'src/app/models/entities/userTag';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.css']
})
export class HomePostComponent implements OnInit {


  postDetail: PostDetailDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  reports: Report[];
  favs: number[];
  commentDictionary: Dictionary<CommentItem> = {};
  constructor(private sanitizer: DomSanitizer,
    private postService: PostService,
    private reportService: ReportService,
    private toastService: ToastrService,
    private authService: AuthService,
    private clipboardService: ClipboardService,
    private favService: FavService,
    private notificationService: NotificationService,
    private signalR: SignalService,
    private tagService: TagService) {

  }

  ngOnInit(): void {
    initFlowbite();
    this.getUserFavs();
    this.getAllReports();
    this.getAllPostDetail();
  }


  getAllReports() {
    this.reportService.GetAllReports().subscribe(response => {
      this.reports = response.data;
    })
  }

  getAllPostDetail() {
    this.postService.getAllPostDetail(this.authService.getUserInfo().id).subscribe(response => {

      this.postDetail = response.data;
      response.data.forEach(post => {
        this.commentDictionary[post.id] = { image: undefined, message: "", id: post.id };
      })
    })
  }

  getPostContentImage(image: string) {
    return this.imageUrl + image;
  }

  commentPhotoFileClick(id: number) {
    document.getElementById("comment-image-file-" + id).click();
  }

  commentPostImageSelected(event: any, id: number) {
    if (event.target.files && event.target.files.length) {
      this.commentDictionary[id].image = event.target.files[0];

    }
  }


  commentGetPostImage(id: number) {
    const imageUrl = URL.createObjectURL(this.commentDictionary[id].image);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  commentDeleteImage(id: number) {
    this.commentDictionary[id].image = undefined;
  }

  getUserProfileImage(image: string) {
    if (image != null) {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg'
  }




  report(reportId: number, postId: number) {
    let userReport: UserReport = Object.assign({}, {
      id: 0,
      userId: this.authService.getUserInfo().id,
      postId: postId,
      reportId: reportId
    })

    this.reportService.AddUserReport(userReport).subscribe(response => {
      this.toastService.info("Kullanıcı ve gönderi içeriği bildirilmiştir...");
    }, responseError => {
      this.toastService.error(responseError.error.message);
    })


  }

  getUserFavs() {
    this.favService.GetUserFavs(this.authService.getUserInfo().id).subscribe(response => {
      this.favs = response.data;
    })
  }

  favClick(postId: number, postUserId: number, Label:string) {
    let entity: Fav = Object.assign({}, {
      id: 0,
      userId: this.authService.getUserInfo().id,
      postId: postId,
      creationDate: new Date()
    })

    const notification: Notification = Object.assign({}, {
      id: uuidv4(),
      userId: this.authService.getUserInfo().id,
      targetId: postUserId,
      notificationIntId: postId,
      notificationUniqueId: null,
      type: 3,
      creationDate: new Date(),
      isRead: false
    });




    if (!this.favs.includes(postId)) {
      this.favs.push(postId);
      this.favService.add(entity).subscribe(response => {
        this.notificationService.Add(notification).subscribe(newResponse => {
          this.signalR.SendNotification(postUserId);
        })
      })
    }
    else {
      this.favs.splice(this.favs.indexOf(postId), 1);
      this.favService.delete(entity).subscribe(response => {

      })
    }

    if(this.authService.getUserInfo().id != postUserId)
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

  getPostFavCount(id: number, count: number, favArray: number[]) {

    if (this.favs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id, favArray)) {
      return count;
    }
    else if (!this.favs.includes(id) && this.favService.checkUserIsFav(this.authService.getUserInfo().id, favArray)) {
      return count - 1;
    }
    else if (this.favs.includes(id) && !this.favService.checkUserIsFav(this.authService.getUserInfo().id, favArray)) {
      return count + 1;
    }
    else {
      return count;
    }

  }

  getFavClass(id: number) {

    if (this.favs.includes(id)) {
      return "cursor-pointer  text-red-700"
    }
    else {
      return "cursor-pointer text-slate-700 hover:text-slate-500 dark:text-white dark:hover:text-secondary-color-extra-light"
    }
  }

  copy(id: number) {
    let postUrl = "http://localhost:4200/posts/" + id;
    this.clipboardService.copyFromContent(postUrl);
    this.toastService.success("Gönderi bağlantısı kopyalandı");
  }

  Comment(parentid: number, userId: number,Label:string) {

    const entity: Notification = Object.assign({}, {
      id: uuidv4(),
      userId: this.authService.getUserInfo().id,
      targetId: userId,
      notificationIntId: parentid,
      notificationUniqueId: null,
      type: 4,
      creationDate: new Date(),
      isRead: false
    });

    if (this.commentDictionary[parentid].image != undefined) {
      if (this.commentDictionary[parentid].message.length > 0) {
        let post: Post = Object.assign({}, {
          id: null,
          userId: this.authService.getUserInfo().id,
          parentId: parentid,
          message: this.commentDictionary[parentid].message,
          imagePath: "",
          type: 2,
          creationDate: null
        });

        this.postService.Add(this.commentDictionary[parentid].image, post).subscribe(response => {
          this.postService.PredictCategory(post.message).subscribe(newResponse => {
            let postTag: PostTag = Object.assign({}, {
              id: 0,
              postId: response.data,
              label: newResponse.category,
              creationDate: new Date()
            })

            this.tagService.AddPostTag(postTag).subscribe(responseNew => {
              this.commentDictionary[parentid].image = undefined;
              this.commentDictionary[parentid].message = "";
              this.toastService.info("Paylaşım yapıldı..");
              if (this.authService.getUserInfo().id != userId) {
                this.notificationService.Add(entity).subscribe(newResponse => {
                  this.signalR.SendNotification(userId);

                })
              }
            });
          })

        }, responseError => {
          this.commentDictionary[parentid].image = undefined;
          this.commentDictionary[parentid].message = "";
          this.toastService.error();
        })
      }
      else {
        let post: Post = Object.assign({}, {
          id: null,
          userId: this.authService.getUserInfo().id,
          parentId: parentid,
          message: this.commentDictionary[parentid].message,
          imagePath: "",
          type: 3,
          creationDate: null
        });
        this.postService.Add(this.commentDictionary[parentid].image, post).subscribe(response => {
          this.postService.PredictCategory(post.message).subscribe(newResponse => {
            let postTag: PostTag = Object.assign({}, {
              id: 0,
              postId: response.data,
              label: newResponse.category,
              creationDate: new Date()
            })

            this.tagService.AddPostTag(postTag).subscribe(responseNew => {
              this.commentDictionary[parentid].image = undefined;
              this.commentDictionary[parentid].message = "";
              this.toastService.info("Paylaşım yapıldı..");

              if (this.authService.getUserInfo().id != userId) {
                this.notificationService.Add(entity).subscribe(newResponse => {
                  this.signalR.SendNotification(userId);

                })
              }

            });
          })

        }, responseError => {
          this.commentDictionary[parentid].image = undefined;
          this.commentDictionary[parentid].message = "";
          this.toastService.error();
        })
      }
    }
    else {
      if (this.commentDictionary[parentid].message.length > 0) {
        let post: Post = Object.assign({}, {
          id: null,
          userId: this.authService.getUserInfo().id,
          parentId: parentid,
          message: this.commentDictionary[parentid].message,
          imagePath: "",
          type: 1,
          creationDate: null
        });

        this.postService.Add(null, post).subscribe(response => {
          this.postService.PredictCategory(post.message).subscribe(newResponse => {
            let postTag: PostTag = Object.assign({}, {
              id: 0,
              postId: response.data,
              label: newResponse.category,
              creationDate: new Date()
            })

            this.tagService.AddPostTag(postTag).subscribe(responseNew => {
              this.commentDictionary[parentid].image = undefined;
              this.commentDictionary[parentid].message = "";
              this.toastService.info("Paylaşım yapıldı..");

              if (this.authService.getUserInfo().id != userId) {
                this.notificationService.Add(entity).subscribe(newResponse => {
                  this.signalR.SendNotification(userId);

                })
              }

            });
          })
        }, responseError => {
          this.commentDictionary[parentid].image = undefined;
          this.commentDictionary[parentid].message = "";
          this.toastService.error();
        })
      }
      else {
        this.toastService.error("Lütfen düşünceleriniz paylaşın..");
      }
    }

    if(this.authService.getUserInfo().id != userId)
    {
      const userTag:UserTag = Object.assign({},{
        id:0,
        userId:this.authService.getUserInfo().id,
        postId:parentid,
        label:Label,
        creationDate:new Date()
      })
  
      this.tagService.AddUserTag(userTag).subscribe();
    }
  }




}
