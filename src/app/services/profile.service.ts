import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { Profile } from '../models/entities/profile';
import { Observable } from 'rxjs';
import { UserProfileDto } from '../models/dtos/userProfileDto';
import { ResponseModel } from '../models/responsemodel/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl:string = "https://localhost:7223/api/Profiles";
  constructor(private httpClient:HttpClient) { }

  getUserProfile(id:number):Observable<SingleResponseModel<UserProfileDto>>
  {
    let newUrl = this.apiUrl + '/getprofilebyuserid?id='+id;
    return this.httpClient.get<SingleResponseModel<UserProfileDto>>(newUrl);
  }

  update(profile:Profile):Observable<ResponseModel>
  {
    let newUrl = this.apiUrl + '/update';
    return this.httpClient.post<ResponseModel>(newUrl,profile);
  }

  updateProfileImage(file:File,profile:Profile):Observable<ResponseModel>
  {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', profile.id.toString());
    let newUrl = this.apiUrl + '/updateprofileimage';
    return this.httpClient.post<ResponseModel>(newUrl,formData);
  }

  updateBackgroundImage(file:File,profile:Profile):Observable<ResponseModel>
  {
    const formData  = new FormData();
    formData.append("image",file);
    formData.append("id",profile.id.toString());
    let newUrl  = this.apiUrl + '/updatebackgroundimage';
    return this.httpClient.post<ResponseModel>(newUrl,formData);
  }
}
