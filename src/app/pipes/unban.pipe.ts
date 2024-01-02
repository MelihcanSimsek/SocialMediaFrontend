import { Pipe, PipeTransform } from '@angular/core';
import { UserBanDto } from '../models/dtos/userBanDto';

@Pipe({
  name: 'unban'
})
export class UnbanPipe implements PipeTransform {

  transform(value: UserBanDto[],bannedFilter:string): UserBanDto[] {
    bannedFilter = bannedFilter?bannedFilter.toLocaleLowerCase():"";
    return bannedFilter?value.filter((c:UserBanDto)=>c.userName.toLocaleLowerCase().indexOf(bannedFilter)!==-1):value;
  }

}
