import { Component } from '@angular/core';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent {

constructor() {
  sessionStorage.setItem("page","2");
  
}
}
