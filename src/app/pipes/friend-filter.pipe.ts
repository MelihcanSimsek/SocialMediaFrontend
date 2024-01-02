import { Pipe, PipeTransform } from '@angular/core';
import { UserFollowerDto } from '../models/dtos/userFollowerDto';

@Pipe({
  name: 'friendFilter'
})
export class FriendFilterPipe implements PipeTransform {

  transform(value: UserFollowerDto[],friendFilter:string ): UserFollowerDto[] {
    friendFilter = friendFilter?friendFilter.toLocaleLowerCase():"";
    return friendFilter?value.filter((c:UserFollowerDto)=>c.name.toLocaleLowerCase().indexOf(friendFilter)!==-1):value;
  }

}
