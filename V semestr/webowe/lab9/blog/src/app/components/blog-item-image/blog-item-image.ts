import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- To musi być

@Component({
  selector: 'blog-item-image',
  standalone: true,
  imports: [CommonModule], // <--- I tutaj też
  templateUrl: './blog-item-image.html',
  styleUrl: './blog-item-image.scss'
})
export class BlogItemImageComponent {
  @Input() image?: string;
}