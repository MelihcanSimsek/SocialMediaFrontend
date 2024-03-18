import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Advertise } from 'src/app/models/entities/advertise';
import { AdvertiseService } from 'src/app/services/advertise.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-side-advertise',
  templateUrl: './side-advertise.component.html',
  styleUrls: ['./side-advertise.component.css']
})
export class SideAdvertiseComponent implements OnInit {
  advertiseForm:FormGroup;
  advertiseImage:any = undefined;
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private advertiseService:AdvertiseService) {
    
  }

  ngOnInit(): void {
    this.createAdvertiseForm();
  }


  createAdvertiseForm()
  {
    this.advertiseForm = this.formBuilder.group({
      brandName:["",Validators.required],
      description:["",Validators.required],
      label:["",Validators.required],
      brandUrl:["",Validators.required],
      endDate:["",Validators.required]
    })
  }

  AdvertiseImageSelected(event:any)
  {
    if (event.target.files && event.target.files.length) {
      this.advertiseImage = event.target.files[0];
    }
  }


  Add()
  {
    if(this.advertiseForm.valid && this.advertiseImage != undefined)
    {
      const advertise:Advertise = Object.assign({},{
        id:uuidv4(),
        brandName:this.advertiseForm.value.brandName,
        description:this.advertiseForm.value.description,
        label:this.advertiseForm.value.label,
        url:this.advertiseForm.value.brandUrl,
        creationDate:new Date(),
        endDate:new Date(this.advertiseForm.value.endDate),
        type:2,
        imagePath:""
      });
      console.log(advertise);
      this.advertiseService.Add(this.advertiseImage,advertise).subscribe(response=>{
        this.toastrService.success("Reklam başarılı bir şekilde paylaşıldı");
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
    }
    else
    {
      this.toastrService.error("Lütfen bilgileri doldurunuz..","Ekleme Başarısız");
    }
  }
}
