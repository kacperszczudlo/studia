import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterTextPipe implements PipeTransform {

  // ZMIANA: value: any (zamiast value: any[])
  // Dzięki temu pipe przyjmie 'null', który daje async pipe na starcie
  transform(value: any, filterText: any): any {
    // Jeśli wartość jest null/undefined (np. dane się jeszcze ładują), zwróć pustą tablicę
    if (!value) {
      return [];
    }
    // Jeśli nie ma tekstu do filtrowania, zwróć wszystko
    if (!filterText) {
      return value;
    }

    filterText = filterText.toLowerCase();

    // Filtrowanie
    return value.filter((val: any) => {
      return val.text.toLowerCase().includes(filterText);
    });
  }
}