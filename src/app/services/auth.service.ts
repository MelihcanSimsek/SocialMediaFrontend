import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/auth/loginModel';
import { SingleResponseModel } from '../models/responsemodel/singleResponseModel';
import { TokenModel } from '../models/auth/tokenModel';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/auth/registerModel';
import { UserModel } from '../models/auth/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalstorageService,
    private jwtHelperService:JwtHelperService) { }

    apiUrl:string = "https://localhost:7223/api/Auth";

    login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>
    {
      let newUrl = this.apiUrl + '/login';
      return this.httpClient.post<SingleResponseModel<TokenModel>>(newUrl,loginModel);
    }

    register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>
    {
      let newUrl = this.apiUrl + '/register';
      return this.httpClient.post<SingleResponseModel<TokenModel>>(newUrl,registerModel);
    }

    isAuthenticated()
    {
      if(this.localStorageService.getItem("token"))
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    decodeToken(token:any)
    {
      return this.jwtHelperService.decodeToken(token);
    }


    loggedIn()
    {
      return this.jwtHelperService.isTokenExpired(this.localStorageService.getItem("token"));
    }

    getUserInfo()
    {
      let decodedToken = this.decodeToken(this.localStorageService.getItem("token"));
      if(decodedToken)
      {
        if(!this.loggedIn())
        {
          let tokenInfoName = Object.keys(decodedToken).filter(x=>x.endsWith("/name"))[0];
          var username  = String(decodedToken[tokenInfoName]);
  
          let tokenInfoId = Object.keys(decodedToken).filter(x=>x.endsWith("/nameidentifier"))[0];
          var userId = Number(decodedToken[tokenInfoId]);

          let claimInfo = Object.keys(decodedToken).filter(x=>x.endsWith("/role"))[0];
          var roles = decodedToken[claimInfo];
  
          var emailInfo = decodedToken.email;
          
          const user:UserModel = Object.assign({},{
            name:username,
            id:userId,
            email:emailInfo,
            roles:roles
          })
          
          return user;
        }
      }
      return null;
    }
}
