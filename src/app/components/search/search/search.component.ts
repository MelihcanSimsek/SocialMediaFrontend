import { Component, OnInit } from '@angular/core';
import { UserProfileDto } from 'src/app/models/dtos/userProfileDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchInput:string="";
  searchedUsers:UserProfileDto[];
  imageUrl:string = "https://localhost:7223/Uploads/images/";
  totalPage:number;
  currentPage:number=0;
  perPageUserNumber:number=6;
  constructor(private userService:UserService) {
    
  }

  ngOnInit(): void {  
    this.checkSessionStorage();
    
  }

  checkSessionStorage()
  {
    if(sessionStorage.getItem("search") != null)
    {
      this.searchInput = sessionStorage.getItem("search");
      this.Search();
      sessionStorage.removeItem("search");
    }
  }

  Search()
  {
    const trimmedValue = this.searchInput.trim();
    if(trimmedValue !== "")
    {
      this.userService.SearchUserTotalCount(this.searchInput).subscribe(oldResponse=>{
        if(oldResponse.data === 0)
        {
          this.totalPage = 0;
        }
        else
        {
          this.totalPage = Math.floor((oldResponse.data/this.perPageUserNumber))+1 ;
          this.currentPage =  1;
        }

        if(this.totalPage != 0)
        {
          this.userService.SearchUser(this.searchInput,this.currentPage,this.perPageUserNumber).subscribe(response=>{
            this.searchedUsers = response.data;
            
          })
        }
        else
        {
          this.searchedUsers = undefined;
        }
       
      })

    
    }
    else{
      this.searchedUsers = undefined;
    }
  }

  getUserAvatar(image:string)
  {
    if(image != null)
    {
      return this.imageUrl + image;
    }
    return this.imageUrl + 'profile_image.jpg';

  }


  checkLocationTrim(location:string)
  {
    if(location != undefined && location.trim() !== "")
    {
      return true;
    }
    return false;
    
  }

  pageChange(newPageNumber:number)
  {
    this.currentPage = newPageNumber;
    this.userService.SearchUser(this.searchInput,this.currentPage,this.perPageUserNumber).subscribe(response=>{
      this.searchedUsers = response.data;
    })
  }

  getPreviousClass()
  {
    if(this.currentPage > 1)
    {
      return "flex items-center justify-center px-6 py-4 bg-primary-color hover:opacity-90 rounded-lg cursor-pointer"
    }
    return "flex items-center justify-center px-6 py-4 bg-primary-color hover:opacity-90 rounded-lg cursor-pointer invisible";
  }

  getNextClass()
  {
    if(this.currentPage < this.totalPage)
    {
      return "flex items-center justify-center px-6 py-4 bg-primary-color hover:opacity-90 rounded-lg cursor-pointer"
    }
    return "flex items-center justify-center px-6 py-4 bg-primary-color hover:opacity-90 rounded-lg cursor-pointer invisible";
  }
}
