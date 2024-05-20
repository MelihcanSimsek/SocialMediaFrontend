import { Component } from '@angular/core';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.css']
})
export class PostScreenComponent {

  constructor() {
    sessionStorage.removeItem("page") 
    
  }
}
