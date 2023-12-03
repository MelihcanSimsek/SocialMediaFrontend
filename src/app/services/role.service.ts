import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  checkRolesForAdmin(roles:string[])
  {
    if(roles == undefined)
    {
      return false;
    }

    if(typeof roles == 'string')
    {
      if(roles == "admin"){
        return true;
      }
    }

    for (let i = 0; i < roles.length; i++) {
      
      if(roles[i] == "admin")
      {
        return true;
      }
    }
    return false;
  }
}
