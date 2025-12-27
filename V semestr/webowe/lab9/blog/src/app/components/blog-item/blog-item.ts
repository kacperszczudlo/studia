import { Component, Input } from '@angular/core'; 
import { CommonModule } from "@angular/common"; 
// Upewnij się, że te importy są poprawne (bez .component jeśli zmieniłeś nazwy plików)
import { BlogItemImageComponent } from '../blog-item-image/blog-item-image'; 
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text'; 

@Component({
  selector: 'blog-item', 
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent, CommonModule], 
  templateUrl: './blog-item.html',
  styleUrl: './blog-item.scss'
})
export class BlogItemComponent { 
  @Input() image?: string; 
  @Input() text?: string; 
  @Input() id?: string; // <--- DODAJ TĘ LINIJKĘ
}