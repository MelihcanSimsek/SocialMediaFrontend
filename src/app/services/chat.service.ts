import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { ChatResponseDto } from '../models/dtos/chatResponseDto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserChat } from '../models/entities/userChat';
import { ResponseModel } from '../models/responsemodel/responseModel';
import { ListResponseModel } from '../models/responsemodel/listResponseModel';
import { ChatProfileDto } from '../models/dtos/chatProfileDto';
import { ChatMessage } from '../models/entities/chatMessage';
import { Chat } from '../models/entities/chat';
import { MessageDto } from '../models/dtos/messageDto';
import { SocketChatModel } from '../models/entities/socketChatModel';
import { ChatUserDto } from '../models/dtos/chatUserDto';




@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userChatapiUrl:string = "https://localhost:7223/api/UserChats";
  chatMessageApiUrl:string = "https://localhost:7223/api/ChatMessages";
  chatApiUrl:string = "https://localhost:7223/api/Chats";

 
  constructor(private httpClient:HttpClient) { 

   
  }



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

  MessageAdd(image:any,message:ChatMessage):Observable<ResponseModel>
  {
    let newUrl = this.chatMessageApiUrl + '/add';
    const formData = new FormData();
    if(image != null)
    {
      formData.append("image",image);
    }
    else
    {
      formData.append("image",null);
    }
    formData.append("id",message.id);
    formData.append("userId",message.userId.toString());
    formData.append("chatId",message.chatId);
    formData.append("content",message.content),
    formData.append("type",message.type.toString());

    return this.httpClient.post<ResponseModel>(newUrl,formData);

  }

  AddChat(chat:Chat):Observable<ResponseModel>
  {
    let newUrl = this.chatApiUrl + '/add'
    return this.httpClient.post<ResponseModel>(newUrl,chat);

  }

  GetAllChatMessages(chatId:string):Observable<ListResponseModel<MessageDto>>
  {
    let newUrl = this.chatMessageApiUrl + '/getallchatmessages?id='+chatId;
    return this.httpClient.get<ListResponseModel<MessageDto>>(newUrl);
  }

  UpdateMessagesSeenTime(entity:ChatUserDto):Observable<ResponseModel>
  {
    let newUrl = this.chatMessageApiUrl + '/updateallmessagesseentime';
    return this.httpClient.post<ResponseModel>(newUrl,entity);
  }
}
