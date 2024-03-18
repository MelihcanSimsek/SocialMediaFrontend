import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advertise } from '../models/entities/advertise';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {
  apiUrl:string = "https://localhost:7223/api/Advertise";
  constructor(private httpClient:HttpClient) { }



  Add(file:File,advertise:Advertise):Observable<ResponseModel>
  {
    const newUrl = this.apiUrl +'/add';
    const formData = new FormData();
    formData.append("id",advertise.id);
    formData.append("brandName",advertise.brandName);
    formData.append("description",advertise.description);
    formData.append("label",advertise.label);
    formData.append("url",advertise.url);
    formData.append("creationDate", advertise.creationDate.toISOString());
formData.append("endDate", advertise.endDate.toISOString());
    formData.append("type",advertise.type.toString());
    formData.append("image",file);
    return this.httpClient.post<ResponseModel>(newUrl,formData)
  }

  GetUserMainAdvertise(id:number):Observable<SingleResponseModel<Advertise>>
  {
    const newUrl = this.apiUrl + "/getmainadvertise?id="+id;
    return this.httpClient.get<SingleResponseModel<Advertise>>(newUrl);
  }


  GetUserSideAdvertise(id:number):Observable<SingleResponseModel<Advertise>>
  {
    const newUrl = this.apiUrl + '/getsideadvertise?id='+id;
    return this.httpClient.get<SingleResponseModel<Advertise>>(newUrl);
  }



  
}
