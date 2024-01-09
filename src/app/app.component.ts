import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialMediaFrontend';

  
  constructor(private localStorageService:LocalstorageService) {
 
    if(this.localStorageService.getItem("theme") == "dark")
    {
      document.documentElement.classList.add("dark");
    } 
    
  }
}
