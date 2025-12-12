import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary', // Nazwa, której używamy w HTML (np. {{ text | summary:35 }})
  standalone: true
})
export class SummaryPipe implements PipeTransform {
  
  transform (value: string | undefined, limit: any): any {
    if (!value) {
      return null;
    }
    const length = Number(limit);

    if (value.length > length) {
        return value.substr(0, length) + '...';
    }
    
    return value;
  }
}