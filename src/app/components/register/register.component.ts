import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalstorageService,
    private router:Router) {
    
  }



  ngOnInit(): void {
    this.createRegisterFrom();
  }

  createRegisterFrom()
  {
    this.registerForm = this.formBuilder.group({
      nameForm:["",Validators.required],
      emailForm:["",Validators.required],
      passwordForm:["",Validators.required],
      passwordRepeatForm:["",Validators.required]
    })
  }

  register()
  {
    if(this.registerForm.valid)
    {
      if(this.registerForm.value.passwordForm == this.registerForm.value.passwordRepeatForm)
      {
        const registerModel:RegisterModel = Object.assign({},{
          name:this.registerForm.value.nameForm,
          email:this.registerForm.value.emailForm,
          password:this.registerForm.value.passwordForm
        });
        this.authService.register(registerModel).subscribe(response=>{
          this.toastrService.success("Kayıt başarılı...");
          setTimeout(() => {
            this.router.navigate(["login"]);
          }, 1500);
        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      }
      else
      {
        this.toastrService.error("Şifre hatalı...");
        this.createRegisterFrom();
      }
    }
    else
    {
      this.toastrService.error("Lütfen bilgileri giriniz...");
    }
  }
}
