import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flag'
})
export class FlagPipe implements PipeTransform {
  transform(check: any, checked?: any): any {
    return checked ? check.filter(x => x.isFlagged === true) : check;
  }

}
