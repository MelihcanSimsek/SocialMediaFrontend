import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.css']
})
export class ProfileSearchComponent implements OnInit {
  searchInput:string;
  constructor(
    private router:Router) {
    
  }


  ngOnInit(): void {
  
  }

 

  Search()
  {
    if(this.searchInput.trim() !== "")
    {
      sessionStorage.setItem("search",this.searchInput);
      this.router.navigate(["search"])
    }
  }
}
