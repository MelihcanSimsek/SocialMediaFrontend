import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { Profile } from '../models/entities/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl:string = "https://localhost:7223/api/Profiles";
  constructor(private httpClient:HttpClient) { }

  getUserProfile(id:number):Observable<SingleResponseModel<Profile>>
  {
    let newUrl = this.apiUrl + '/getprofilebyuserid?id='+id;
    return this.httpClient.get<SingleResponseModel<Profile>>(newUrl);
  }
}
