import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.css']
})
export class SettingsScreenComponent implements OnInit {

  selectedSetting:boolean=false;
  constructor() {
    sessionStorage.removeItem("page") 
  }

  ngOnInit(): void {
    
  }

  changeSelectedSettings(status:boolean)
  {
    this.selectedSetting = status;
  }

  GetSelectedClass(status:boolean)
  {
    if(this.selectedSetting == status)
    {
      return "px-6 py-4 flex items-center justify-center bg-slate-500 hover:opacity-80 text-white rounded-lg cursor-pointer";
    }
    return "px-6 py-4 flex items-center justify-center bg-primary-color-dark hover:opacity-80 dark:bg-secondary-color-light text-white dark:text-secondary-color-extra-dark  rounded-lg cursor-pointer";


  }
}
