import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/auth/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private localStorageService:LocalstorageService,
    private router:Router) {
    
    
  }


  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.loginForm = this.formBuilder.group({
      emailForm:["",Validators.required],
      passwordForm:["",Validators.required]
    });
  }


  login()
  {
    if(this.loginForm.valid)
    {
      const loginModel:LoginModel = Object.assign({},{
        email:this.loginForm.value.emailForm,
        password:this.loginForm.value.passwordForm
      });
      this.authService.login(loginModel).subscribe(response=>{
          this.localStorageService.setItem("token",response.data.token);
          this.toastrService.info("Giriş Başarılı...");
          setTimeout(() => {
            this.router.navigate(["home"])
          }, 1500);
      },responseError=>{
        console.log(responseError);
        this.toastrService.error(responseError.error.message);
      })
    }
    else{
      this.toastrService.error("Lütfen bilgileri giriniz...");
    }
  }
}
