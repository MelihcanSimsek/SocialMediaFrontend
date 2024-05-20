import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-screen',
  templateUrl: './friends-screen.component.html',
  styleUrls: ['./friends-screen.component.css']
})
export class FriendsScreenComponent implements OnInit {
  searchInput:string;

  constructor(private router:Router) {
    sessionStorage.setItem("page","4");
  }

  ngOnInit(): void {
    
  }
  Search(){
    if(this.searchInput != "")
    {
      sessionStorage.setItem("search",this.searchInput);
      this.router.navigate(["search"]);
    }
  }
}
