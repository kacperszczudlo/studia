// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { Blog } from './components/blog/blog'; // Importujemy klasę Blog z pliku blog.ts
import { GalleryComponent } from './components/gallery/gallery'; // <--- DODANY IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Blog, GalleryComponent], // Blog i GalleryComponent są klasami komponentów
  templateUrl: './app.html',
  // Upewnij się, że app.scss/app.css zawiera style potrzebne do renderowania (jeśli jakieś są)
})
export class AppComponent {
  // W starszych szablonach Angular title() może być wymagane w app.html, 
  // ale skoro usunąłeś placeholder, ta klasa jest gotowa.
}