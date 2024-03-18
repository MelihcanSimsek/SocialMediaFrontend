import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/entities/post';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { Observable, from } from 'rxjs';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { PostDetailDto } from '../models/dtos/postDetailDto';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { PredictedText } from '../models/entities/predictedText';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 
  constructor(private httpClient:HttpClient) { }

  apiUrl:string = "https://localhost:7223/api/Posts";
  secondPredictCategoryAPI = "http://localhost:5000/predict_category";

  PredictCategory(text:string):Observable<PredictedText>
  {
    const data = { text };
    return this.httpClient.post<PredictedText>(this.secondPredictCategoryAPI, data);
  }

  Add(file:File,post:Post):Observable<SingleResponseModel<number>>
  {
    const newUrl = this.apiUrl +'/add';
    const formData = new FormData();
    formData.append("userid",post.userId.toString());
    formData.append("parentid",post.parentId.toString());
    formData.append("message",post.message);
    formData.append("type",post.type.toString())
    if(file != null)
    {
      formData.append("image",file);
      
      return this.httpClient.post<SingleResponseModel<number>>(newUrl,formData);
    }
    else
    {
      formData.append("image",null);
      return this.httpClient.post<SingleResponseModel<number>>(newUrl,formData);
    }
    
  }

  Delete(post:Post):Observable<ResponseModel>
  {
    let newUrl = this.apiUrl + '/delete';
    return this.httpClient.post<ResponseModel>(newUrl,post);
  }

  getAllPostDetail(id:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newUrl = this.apiUrl + '/getallpostdetail?id='+id;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newUrl);
  }

  getPostDetailById(id:number):Observable<SingleResponseModel<PostDetailDto>>
  {
    let newUrl = this.apiUrl + '/getpostdetailbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<PostDetailDto>>(newUrl);
  }


  getAllCommentByPostId(id:number,userId:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newUrl = this.apiUrl + '/getallcommentbypostid?id='+id+'&userId='+userId;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newUrl);
  }

  GetAllUserPosts(id:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newUrl = this.apiUrl + '/getalluserpost?id='+id;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newUrl);
  }

  GetAllUserComment(id:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newUrl = this.apiUrl + '/getallusercomment?id='+id;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newUrl);
  }

  GetAllFavedPost(id:number):Observable<ListResponseModel<PostDetailDto>>
  {
    let newUrl = this.apiUrl + '/getallfavedpostuserid?id='+id;
    return this.httpClient.get<ListResponseModel<PostDetailDto>>(newUrl);
  }

 

  GetAll()
  {
    let newUrl = this.apiUrl + '/getall';
    return this.httpClient.get(newUrl);
  }
}
