import { Component, Input } from '@angular/core'; 
import { CommonModule } from "@angular/common"; 
// Poprawiona ścieżka:
import { SummaryPipe } from "../../pipes/summary-pipe"; 

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [CommonModule, SummaryPipe], // Dodajemy Pipe i CommonModule!
  templateUrl: './blog-item-text.html',
  styleUrl: './blog-item-text.scss'
})
export class BlogItemTextComponent {
  @Input() text?: string;
}