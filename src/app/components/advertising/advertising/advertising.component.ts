import { Component, OnInit } from '@angular/core';
import { Advertise } from 'src/app/models/entities/advertise';
import { AdvertiseService } from 'src/app/services/advertise.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {

advertise:Advertise=null;
imageUrl = "https://localhost:7223/Uploads/images/";
constructor(private advertiseService:AdvertiseService,private authService:AuthService) {
  
}

  ngOnInit(): void {
   this.GetUserSideAdvertise();
  }


  GetUserSideAdvertise()
  {
    this.advertiseService.GetUserSideAdvertise(this.authService.getUserInfo().id).subscribe(response=>{
      this.advertise = response.data;
    })
  }

  getAdvertiseImage(image:string)
  {
    return this.imageUrl + image;
  }

}
