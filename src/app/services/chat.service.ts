import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { ChatResponseDto } from '../models/dtos/chatResponseDto';
import { Observable } from 'rxjs';
import { UserChat } from '../models/entities/userChat';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { ChatProfileDto } from '../models/dtos/chatProfileDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userChatapiUrl:string = "https://localhost:7223/api/UserChats";
  constructor(private httpClient:HttpClient) { }


  ChatUserAdd(entity:UserChat):Observable<ResponseModel>
  {
    let newUrl = this.userChatapiUrl + '/add';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }

  GetUserMessageList(id:number):Observable<ListResponseModel<ChatProfileDto>>
  {
    let newUrl = this.userChatapiUrl + '/getusermessagelist?id='+id;
    return this.httpClient.get<ListResponseModel<ChatProfileDto>>(newUrl);
  }

  CheckUsersHaveChatRoom(firstUser:number,secondUser:number):Observable<SingleResponseModel<ChatResponseDto>>
  {
    let newUrl = this.userChatapiUrl + '/checkusershaveachatroom?firstid='+firstUser+'&secondid='+secondUser;
    return this.httpClient.get<SingleResponseModel<ChatResponseDto>>(newUrl);
  }
}
