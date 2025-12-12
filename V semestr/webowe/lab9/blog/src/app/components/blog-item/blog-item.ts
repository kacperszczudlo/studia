import { Component, Input } from '@angular/core'; 
import { CommonModule } from "@angular/common"; 
// Zakładamy, że klasy wewnątrz plików to BlogItemImageComponent i BlogItemTextComponent
import { BlogItemImageComponent } from '../blog-item-image/blog-item-image'; 
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text'; 

@Component({
  selector: 'blog-item', 
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent, CommonModule], 
  templateUrl: './blog-item.html',
  styleUrl: './blog-item.scss'
})
export class BlogItemComponent { // Klasa musi być poprawnie eksportowana!
  @Input() image?: string; 
  @Input() text?: string; 
}