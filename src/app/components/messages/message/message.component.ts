import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Modal from 'flowbite/lib/esm/components/modal';
import { ChatProfileDto } from 'src/app/models/dtos/chatProfileDto';
import { ChatUserDto } from 'src/app/models/dtos/chatUserDto';
import { MessageDto } from 'src/app/models/dtos/messageDto';
import { UserFollowerDto } from 'src/app/models/dtos/userFollowerDto';
import { Item } from 'src/app/models/entities/Item';
import { Chat } from 'src/app/models/entities/chat';
import { ChatMessage } from 'src/app/models/entities/chatMessage';
import { Notification } from 'src/app/models/entities/notification';
import { SocketChatModel } from 'src/app/models/entities/socketChatModel';
import { UserChat } from 'src/app/models/entities/userChat';
import { Dictionary } from 'src/app/models/responsemodel/Dictionary';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { FollowerService } from 'src/app/services/follower.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SignalService } from 'src/app/services/signal.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  myid:number;
  CurrentChatProfile:ChatProfileDto;
  FriendMessageList:ChatProfileDto[];
  imageUrl = "https://localhost:7223/Uploads/images/";
  FriendList:UserFollowerDto[];
  friendFilterText:string = "";
  chatFilterText:string = "";
  chatDictionary: Dictionary<Item> = {};
  messages:MessageDto[];

  constructor(private chatService:ChatService,
    private authService:AuthService,
    private followerService:FollowerService,
    private sanitizer: DomSanitizer,
    private signalService:SignalService,
    private notificationService:NotificationService,
    private router:Router
   ) {
    
  }

  ngOnInit(): void {
    this.myid = this.authService.getUserInfo().id;
    this.getMessageList();
    this.signalService.messageReceived.subscribe((item:SocketChatModel) => {
      // Check if the received userId matches the current user's id
      if (this.authService.getUserInfo().id === item.userId) {
        this.handleReceivedMessage(item);
      }
    });
  }



  handleReceivedMessage(item:SocketChatModel)
  {
    this.chatService.GetUserMessageList(this.authService.getUserInfo().id).subscribe(oldResponse=>{
      this.FriendMessageList = oldResponse.data;
      this.CurrentChatProfile =  this.FriendMessageList.find(p=>p.chatId == this.CurrentChatProfile.chatId);
      if (this.CurrentChatProfile.chatId === item.chatId) {
     
        this.chatService.GetAllChatMessages(item.chatId).subscribe(response => {
          this.messages = response.data;
          // setTimeout(() => {
          //   var chatElement = document.getElementById("chat");
          // chatElement.scrollTo(0,chatElement.scrollHeight);
          // }, 1);
        });
      }
    })
  }

  UpdateScrollEvent(event:Event)
  {
    if(this.CurrentChatProfile != null)
    {
      let chatEl = document.getElementById("chat");
      if(chatEl.scrollHeight - chatEl.clientHeight <= chatEl.scrollTop + 1)
      {  
      if(this.CurrentChatProfile.notShowedMessagesCount > 0)
      {
        let entity:ChatUserDto = Object.assign({},{
          userId:this.authService.getUserInfo().id,
          chatId:this.CurrentChatProfile.chatId
        });
        this.chatService.UpdateMessagesSeenTime(entity).subscribe(oldResponse=>{
          this.chatService.GetUserMessageList(this.authService.getUserInfo().id).subscribe(response=>{
            this.FriendMessageList = response.data;
            this.CurrentChatProfile =  this.FriendMessageList.find(p=>p.chatId == this.CurrentChatProfile.chatId);
          })
        })
      }
    }
    }
  }

  getMessageList()
  {
    this.chatService.GetUserMessageList(this.authService.getUserInfo().id).subscribe(response=>{
      this.FriendMessageList =  response.data;
      if(sessionStorage.getItem("chat") != null)
      {
        this.SelectUser(sessionStorage.getItem("chat"));
      }
    })
  }

  GetShortMessageContent(content: string) {
    if (content != null) {
      return content.length > 35 ? content.slice(0, 35) + " ....." : content;
    }
    return "";
  }

  GetUserAvatar(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg';
  }

  GetMessageImage(image:string)
  {
    return this.imageUrl + image;
  }

  GetMessageListClass(chatId:string)
  {
    if(this.CurrentChatProfile != undefined   && this.CurrentChatProfile.chatId == chatId)
    {
      return "flex flex-col w-full py-2 px-2 cursor-pointer  bg-primary-color-dark  text-white "
    }
    return "flex flex-col w-full py-2 px-2 bg-white cursor-pointer shadow-lg hover:bg-primary-color-dark hover:opacity-80 text-black hover:text-white"
  }

  OpenImageFile(){
    let element = document.getElementById("chat-image-file");
    element.click();
  }

  ChatImageSelected(event:any)
  {
    if (event.target.files && event.target.files.length) {
      this.chatDictionary[this.CurrentChatProfile.chatId].image = event.target.files[0];
    }
  }


  GetChatImage()
  {
    const imageUrl = URL.createObjectURL(this.chatDictionary[this.CurrentChatProfile.chatId].image);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  DeleteChatImage(){
    this.chatDictionary[this.CurrentChatProfile.chatId].image = undefined;
  }

  SelectUser(chatId:string){
   this.CurrentChatProfile =  this.FriendMessageList.find(p=>p.chatId == chatId);
   if(!this.chatDictionary[chatId])
   {
    this.addNewChatRoom(chatId)
   }

   sessionStorage.setItem("chat",chatId);
   this.chatService.GetAllChatMessages(chatId).subscribe(response=>{
    this.messages = response.data;
    setTimeout(() => {
      var chatElement = document.getElementById("chat");
    chatElement.scrollTo(0,chatElement.scrollHeight);
    }, 1);
   })

  }

  addNewChatRoom(chatId:string,): void {
    this.chatDictionary[chatId] = {image:undefined,message:""};
  }


  OpenMessageBoxModal()
  {
    let modal = new Modal(document.getElementById('message-box-modal'));
    this.GetAllUserFriends(this.authService.getUserInfo().id);
    modal.show();
  }

  GetAllUserFriends(id:number)
  {
    this.followerService.GetAllUserFriends(id).subscribe(response=>{
      this.FriendList = response.data;
    })
  }

  CloseMessageBoxModal()
  {
    let modal = new Modal(document.getElementById('message-box-modal'));
    modal.hide();
  }

  SendMessage(currentUserId:number)
  {
    this.chatService.CheckUsersHaveChatRoom(this.authService.getUserInfo().id,currentUserId).subscribe(response=>{
      if(response.data.open)
      {
        sessionStorage.setItem("chat",response.data.chatId);
        location.reload()
      }
      else{
        const uuid = uuidv4();
        let firstUserChat:UserChat = Object.assign({},{
          id:0,
          userId:currentUserId,
          chatId:uuid
        });

        let secondUserChat:UserChat = Object.assign({},{
          id:0,
          userId:this.authService.getUserInfo().id,
          chatId:uuid
        });

        this.chatService.ChatUserAdd(firstUserChat).subscribe(response=>{
          this.chatService.ChatUserAdd(secondUserChat).subscribe(response=>{
            sessionStorage.setItem("chat",uuid);
            location.reload();
            
          })
        })
      }
    })
    
    
  }

  GetChatHistoryAfterSendingMessaage()
  {
    this.chatService.GetUserMessageList(this.authService.getUserInfo().id).subscribe(oldResponse=>{
      this.FriendMessageList = oldResponse.data;
      this.chatService.GetAllChatMessages(this.CurrentChatProfile.chatId).subscribe(response=>{
      this.messages = response.data;
      setTimeout(() => {
        var chatElement = document.getElementById("chat");
      chatElement.scrollTo(0,chatElement.scrollHeight);
      }, 1);
    
      })
    })
  }

  Search()
  {
    if(this.chatFilterText.trim() !== "")
    {
      sessionStorage.setItem("search",this.chatFilterText);
      this.router.navigate(["search"]);
    }
  }

  Send(){

    const entity:Notification = Object.assign({},{
      id:uuidv4(),
      userId:this.authService.getUserInfo().id,
      targetId:this.CurrentChatProfile.userId,
      notificationIntId:null,
      notificationUniqueId:this.CurrentChatProfile.chatId,
      type:5,
      creationDate:new Date(),
      isRead:false,
    });

    if(this.chatDictionary[this.CurrentChatProfile.chatId].image != undefined)
    {
      if(this.chatDictionary[this.CurrentChatProfile.chatId].message.trim() !== '')
      {
        const messageId:string = uuidv4();
        let message:ChatMessage = Object.assign({},{
          id:messageId,
          userId:this.authService.getUserInfo().id,
          chatId:this.CurrentChatProfile.chatId,
          content:this.chatDictionary[this.CurrentChatProfile.chatId].message,
          imagePath:null,
          type:2,
          creationDate:null,
          seenAt:null,
        });

        let chat:Chat = Object.assign({},{

          id:this.CurrentChatProfile.chatId,
          messageId:messageId
        })

        

        this.chatService.MessageAdd(this.chatDictionary[this.CurrentChatProfile.chatId].image,message).subscribe(response=>{
          this.chatService.AddChat(chat).subscribe(newResponse=>{
            this.signalService.SendMessage(this.CurrentChatProfile.chatId,this.CurrentChatProfile.userId);
            this.chatDictionary[this.CurrentChatProfile.chatId].image = undefined;
            this.chatDictionary[this.CurrentChatProfile.chatId].message = "";
            

            this.notificationService.Add(entity).subscribe(response=>{
              this.signalService.SendNotification(this.CurrentChatProfile.userId);
              this.GetChatHistoryAfterSendingMessaage();
            })
            

          })
        })

      }
      else
      {
        const messageId:string = uuidv4();
        let message:ChatMessage = Object.assign({},{
          id:messageId,
          userId:this.authService.getUserInfo().id,
          chatId:this.CurrentChatProfile.chatId,
          content:this.chatDictionary[this.CurrentChatProfile.chatId].message,
          imagePath:null,
          type:3,
          creationDate:null,
          seenAt:null,
        });

        let chat:Chat = Object.assign({},{

          id:this.CurrentChatProfile.chatId,
          messageId:messageId
        })
        this.chatService.MessageAdd(this.chatDictionary[this.CurrentChatProfile.chatId].image,message).subscribe(oldResponse=>{
          this.chatService.AddChat(chat).subscribe(response=>{
            this.signalService.SendMessage(this.CurrentChatProfile.chatId,this.CurrentChatProfile.userId);
            this.chatDictionary[this.CurrentChatProfile.chatId].image = undefined;
            this.chatDictionary[this.CurrentChatProfile.chatId].message = "";
            
            this.notificationService.Add(entity).subscribe(newResponse=>{
              this.signalService.SendNotification(this.CurrentChatProfile.userId);
              this.GetChatHistoryAfterSendingMessaage();
            })
          })
        })
      }
    }
    else{
      if(this.chatDictionary[this.CurrentChatProfile.chatId].message.trim() !== "")
      {
        const messageId:string = uuidv4();
        let message:ChatMessage = Object.assign({},{
          id:messageId,
          userId:this.authService.getUserInfo().id,
          chatId:this.CurrentChatProfile.chatId,
          content:this.chatDictionary[this.CurrentChatProfile.chatId].message,
          imagePath:null,
          type:1,
          creationDate:null,
          seenAt:null,
        });

        let chat:Chat = Object.assign({},{

          id:this.CurrentChatProfile.chatId,
          messageId:messageId
        })
        this.chatService.MessageAdd(null,message).subscribe(oldResponse=>{
          this.chatService.AddChat(chat).subscribe(response=>{
            this.signalService.SendMessage(this.CurrentChatProfile.chatId,this.CurrentChatProfile.userId);
            this.chatDictionary[this.CurrentChatProfile.chatId].image = undefined;
            this.chatDictionary[this.CurrentChatProfile.chatId].message = "";
            
            this.notificationService.Add(entity).subscribe(newResponse=>{
              this.signalService.SendNotification(this.CurrentChatProfile.userId);
              this.GetChatHistoryAfterSendingMessaage();
            })
          })
        })
      }
     
    }


  
  }
}
