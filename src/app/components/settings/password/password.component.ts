import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserForUpdateDto } from 'src/app/models/dtos/userForUpdateDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  updateForm:FormGroup;
  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private fb:FormBuilder) {
    
  }

  ngOnInit(): void {
    this.createUpdateForm();
  }

  createUpdateForm()
  {
    this.updateForm = this.fb.group({
      passwordForm:["",Validators.required],
      newPasswordForm:["",Validators.required],
      newPasswordRepeatForm:["",Validators.required]
    });
  }

  Save()
  {
    if(this.updateForm.valid && this.updateForm.value.passwordForm.trim() !== "" && this.updateForm.value.newPasswordForm.trim() !== "" && this.updateForm.value.newPasswordRepeatForm.trim() !== "")
    {
      if(this.updateForm.value.newPasswordForm === this.updateForm.value.newPasswordRepeatForm)
      {
        let entity:UserForUpdateDto = Object.assign({},{
          id:this.authService.getUserInfo().id,
          oldPassword:this.updateForm.value.passwordForm,
          newPassword:this.updateForm.value.newPasswordForm
        });

        this.authService.UpdatePassword(entity).subscribe(response=>{
         this.toastrService.success("Şifre Değiştirildi","İşlem Başarılı");

         setTimeout(() => {
          location.reload(); 
         }, 200);

        },responseError=>{
          this.toastrService.error(responseError.error.message);
          setTimeout(() => {
            location.reload(); 
           }, 200);
        });
      }
      else{
        this.toastrService.error("Şifre tekrarı hatalı");
      }
    
    }
    else
    {
      this.toastrService.info("Lütfen bilgileri giriniz.");
    }
  }
}
