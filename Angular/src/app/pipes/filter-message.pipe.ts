import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMessage'
})
export class FilterMessagePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.Message.toLowerCase().includes(searchText);
    });
   }
}
