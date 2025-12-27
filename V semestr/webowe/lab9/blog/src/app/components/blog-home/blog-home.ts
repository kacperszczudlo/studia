import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar';
import { Blog } from '../blog/blog'; // Importujemy Twój komponent Blog

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [SearchBarComponent, Blog], // Używamy SearchBar i Blog
  templateUrl: './blog-home.html',
  styleUrl: './blog-home.scss'
})
export class BlogHomeComponent {
  
  public filterText: string = '';

  constructor() {}

  // Ta metoda odbiera tekst ze zdarzenia (name) z SearchBara
  getName(text: string): void {
    this.filterText = text;
  }
}