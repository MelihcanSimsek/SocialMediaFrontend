import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Follower } from '../models/entities/follower';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';

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
}
