import { Injectable } from '@angular/core';

import { Fav } from '../models/entities/fav';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  apiUrl:string = "https://localhost:7223/api/Favs";
  constructor(private httpClient:HttpClient) { }

  add(entity:Fav):Observable<ResponseModel>
  {
    let newUrl = this.apiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  delete(entity:Fav):Observable<ResponseModel>
  {
    let newUrl = this.apiUrl + '/delete';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  GetUserFavs(id:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getuserfavedposts?id='+id;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  GetPostCommentsFav(userId:number,postId:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getpostcommentsfav?userId='+userId+'&postId='+postId;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  GetUserPostsFavs(userId:number,targetId:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getuserpostsfavs?userId='+userId+'&targetId='+targetId;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  GetUserCommentsFavs(userId:number,targetId:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getusercommentsfavs?userId='+userId+'&targetId='+targetId;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  GetUserFavPostsFavs(userId:number,targetId:number):Observable<ListResponseModel<number>>
  {
    let newUrl = this.apiUrl + '/getuserfavpostsfavs?userId='+userId+'&targetId='+targetId;
    return this.httpClient.get<ListResponseModel<number>>(newUrl);
  }

  checkUserIsFav(id:number,fav:number[])
  {
    
    if(typeof fav == 'number')
    {
      if(fav == id)
      {
        return true;
      }
    }

    for (let i = 0; i < fav.length; i++) {
      if(fav[i] == id)
      {
        return true;
      }
      
    }
    return false;
  }
}
