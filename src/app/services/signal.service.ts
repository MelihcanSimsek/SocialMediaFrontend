import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { SocketChatModel } from '../models/entities/socketChatModel';
import { BehaviorSubject } from 'rxjs';
import { SocketNotificationModel } from '../models/dtos/socketNotificationModel';


@Injectable({
  providedIn: 'root'
})
export class SignalService {

  public connection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Debug)
  .withUrl("https://localhost:7223/socket-hub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build();
  public messageReceived = new BehaviorSubject<SocketChatModel>({ chatId: '', userId: 0 });
  public notificationReceived = new BehaviorSubject<SocketNotificationModel>({id:0});
  constructor() { 
    this.Start();
    this.ReceiveMessage();
    this.ReceiveNotification();
  }

  public async ReceiveNotification()
  {
    this.connection.on("ReceiveNotification",(item:SocketNotificationModel)=>{
      this.notificationReceived.next(item);
    })

  }

  public async SendNotification(id:number)
  {
    let item:SocketNotificationModel = Object.assign({},{
      id:id,
    });
    return this.connection.invoke("SendNotification",item);
  }

  public async  ReceiveMessage()
  {
    this.connection.on("ReceiveMessage",(item:SocketChatModel)=>{
      this.messageReceived.next(item);
      
    })
  }

  public async SendMessage(chatId:string,userId:number)
  {
    let item = Object.assign({},{
      chatId:chatId,
      userId:userId
    });
    return this.connection.invoke("SendMessage",item);
  }



  public async Start()
  {
    try {
     await this.connection.start();
    } catch (error) {
      console.log(error);
    }
  }


}
