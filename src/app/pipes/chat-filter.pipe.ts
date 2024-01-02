import { Pipe, PipeTransform } from '@angular/core';
import { ChatProfileDto } from '../models/dtos/chatProfileDto';

@Pipe({
  name: 'chatFilter'
})
export class ChatFilterPipe implements PipeTransform {

  transform(value: ChatProfileDto[],chatFilter:string): ChatProfileDto[] {
    chatFilter = chatFilter?chatFilter.toLocaleLowerCase():"";
    return chatFilter?value.filter((c:ChatProfileDto)=>c.name.toLocaleLowerCase().indexOf(chatFilter)!==-1):value;
  }

}
