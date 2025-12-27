import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textFormat]', // Używamy selektora jako atrybutu HTML
  standalone: true
})
export class TextFormatDirective {

  constructor(private el: ElementRef) { }

  // Nasłuchujemy zdarzenia 'blur' (kliknięcie poza input)
  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    // Zamieniamy tekst na małe litery
    this.el.nativeElement.value = value.toLowerCase();
  }

}