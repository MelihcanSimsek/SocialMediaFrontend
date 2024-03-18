import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostTag } from '../models/entities/postTag';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { UserTag } from '../models/entities/userTag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  apiUrl:string = "https://localhost:7223/api/";

  constructor(private httpClient:HttpClient) { }

  AddPostTag(entity:PostTag):Observable<ResponseModel>
  {
    let newUrl = this.apiUrl +"PostTags/add";
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  } 

  AddUserTag(entity:UserTag):Observable<ResponseModel>
  {
    let newUrl =  this.apiUrl + 'UserTags/add';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }
}
