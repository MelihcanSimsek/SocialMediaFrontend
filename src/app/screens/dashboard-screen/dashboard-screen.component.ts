import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.css']
})
export class DashboardScreenComponent implements OnInit {

  selectedItem:boolean = false;
  dashboardRole:boolean;
  constructor(private roleService:RoleService,
    private authService:AuthService) {
    
  }

  ngOnInit(): void {
    this.checkUserRole(this.authService.getUserInfo().roles);

  }

  checkUserRole(roles:string[])
  {
   this.dashboardRole = this.roleService.checkRolesForAdmin(roles);
  }

  ChangeSelectedIndex(status:boolean)
  {
    this.selectedItem = status;
  }

  GetSelectedClass(status:boolean)
  {
    if(this.selectedItem == status )
    {
      return "px-6 py-4 bg-slate-500 hover:opacity-90 rounded-lg text-white cursor-pointer";
    }
    else
    {
      return "px-6 py-4 bg-primary-color hover:opacity-90 rounded-lg text-white dark:bg-secondary-color-light dark:text-secondary-color-extra-dark cursor-pointer";
    }
  }
}
