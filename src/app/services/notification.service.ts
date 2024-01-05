import { Injectable } from '@angular/core';

import { Notification } from '../models/entities/notification';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { UserNotificationDto } from '../models/dtos/userNotificationDto';
import { NotificationSetting } from '../models/entities/notificationSetting';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiUrl = "https://localhost:7223/api/Notifications";
  settingApiUrl = "https://localhost:7223/api/NotificationSettings";
  constructor(private httpClient:HttpClient) { }

  Add(entity:Notification):Observable<ResponseModel>
  {
   let newUrl = this.apiUrl + '/add';
   return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  UpdateReadStateByNotificationId(id:string):Observable<ResponseModel>
  {
    const formData = new FormData();
    formData.append("id",id);
    let newUrl = this.apiUrl + '/updatereadstatebynotificationid';
    return this.httpClient.post<ResponseModel>(newUrl,formData);
  }

  UpdateAllReadStateByUserId(id:number):Observable<ResponseModel>
  {
    const formData = new FormData();
    formData.append("id",id.toString());
    let newUrl = this.apiUrl + '/updateallreadstatebyuserid';
    return this.httpClient.post<ResponseModel>(newUrl,formData);
  }

  GetAllNotificationByUserId(id:number):Observable<ListResponseModel<UserNotificationDto>>
  {
    let newUrl = this.apiUrl + '/getallnotificationbyuserid?id='+id;
    return this.httpClient.get<ListResponseModel<UserNotificationDto>>(newUrl);
  }


  AddNotificationSettings(entity:NotificationSetting):Observable<ResponseModel>
  {
    let newUrl = this.settingApiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  UpdateNotificationSettings(entity:NotificationSetting):Observable<ResponseModel>
  {
    let newUrl = this.settingApiUrl + '/update';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  GetNotificationSettingByUserId(id:number):Observable<SingleResponseModel<NotificationSetting>>
  {

    let newUrl = this.settingApiUrl + '/getnotificationsettingsbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<NotificationSetting>>(newUrl);
  }

  


}
