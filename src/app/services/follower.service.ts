import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Follower } from '../models/entities/follower';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { UserFollowerDto } from '../models/dtos/userFollowerDto';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  apiUrl:string = "https://localhost:7223/api/Followers";
  constructor(private httpClient:HttpClient) { }
  
  add(entity:Follower):Observable<ResponseModel>
  {
    
    let newUrl = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  delete(entity:Follower):Observable<ResponseModel>
  {
    let newUrl = this.apiUrl + '/delete';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  GetAllFollowedIdsByUserid(userid:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getallfolloweduseridbyuserid?id='+userid;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  GetAllFollowerIdsByUserid(userid:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getallfollowerbyuserid?id='+userid;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  GetAllUserFriends(userid:number):Observable<ListResponseModel<UserFollowerDto>>
  {
    let newUrl = this.apiUrl + '/getalluserfriends?id='+userid;
    return this.httpClient.get<ListResponseModel<UserFollowerDto>>(newUrl);
  }

  GetAllFollowerListWithoutFriends(userid:number):Observable<ListResponseModel<UserFollowerDto>>
  {
    let newUrl = this.apiUrl + '/getalluserfollowerlistwithoutfriends?id='+userid;
    return this.httpClient.get<ListResponseModel<UserFollowerDto>>(newUrl);
  }

  GetAllFollowedListWithoutFriends(userid:number):Observable<ListResponseModel<UserFollowerDto>>
  {
    let newUrl = this.apiUrl + '/getalluserfollowedlistwithoutfriends?id='+userid;
    return this.httpClient.get<ListResponseModel<UserFollowerDto>>(newUrl); 
  }
}
