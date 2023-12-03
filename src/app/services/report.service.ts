import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReport } from '../models/entities/userReport';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { Observable } from 'rxjs';
import { ReportDetailDto } from '../models/dtos/reportDetailDto';
import { Report } from '../models/entities/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportApiUrl:string = "https://localhost:7223/api/Reports";
  userReportApiUrl:string = "https://localhost:7223/api/UserReports";
  constructor(private httpClient:HttpClient) { }

  AddUserReport(userReport:UserReport):Observable<ResponseModel>
  {
    let newUrl = this.userReportApiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newUrl,userReport);
  }

  DeleteUserReport(userReport:UserReport):Observable<ResponseModel>
  {
    let newUrl = this.userReportApiUrl + '/delete';
    return this.httpClient.post<ResponseModel>(newUrl,userReport);
  }

  GetAllUserReports():Observable<ListResponseModel<ReportDetailDto>>
  {
    let newUrl = this.userReportApiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<ReportDetailDto>>(newUrl);
  }

  GetAllReports():Observable<ListResponseModel<Report>>
  {
    let newUrl = this.reportApiUrl + '/getall';
    return this.httpClient.get<ListResponseModel<Report>>(newUrl);
  }

}
