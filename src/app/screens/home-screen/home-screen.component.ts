import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/auth/userModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit{

  user:UserModel;
  constructor(private authService:AuthService) {
    sessionStorage.setItem("page","1");
    
  }

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation()
  {
    this.user =  this.authService.getUserInfo();
  }
}
