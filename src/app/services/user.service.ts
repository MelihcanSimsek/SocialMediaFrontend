import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { TokenModel } from '../models/auth/tokenModel';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { UserBanDto } from '../models/dtos/userBanDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string = "https://localhost:7223/api/Users";
  constructor(private httpClient:HttpClient) { }

  Ban(id:number):Observable<ResponseModel>
  {
    const formData = new FormData();
    formData.append("id",id.toString())
    let newUrl = this.apiUrl + '/ban';
    return this.httpClient.post<ResponseModel>(newUrl,formData);
  }

  ChangeUserName(name:string,id:number):Observable<SingleResponseModel<TokenModel>>
  {

    const formData = new FormData();
    formData.append("name",name);
    formData.append("id",id.toString());
    let newUrl = this.apiUrl + '/changeusername';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newUrl,formData);
  }

  Unban(id:number):Observable<ResponseModel>
  {
    const formdata = new FormData();
    formdata.append("id",id.toString());
    let newUrl = this.apiUrl + '/unban';
    return this.httpClient.post<ResponseModel>(newUrl,formdata);
  }

  GetBannedUsers():Observable<ListResponseModel<UserBanDto>>
  {
    let newUrl = this.apiUrl + '/getbannedusers';
    return this.httpClient.get<ListResponseModel<UserBanDto>>(newUrl);
  }
}
