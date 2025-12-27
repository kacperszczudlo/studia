import { Component, Input } from '@angular/core'; 
import { CommonModule } from "@angular/common"; 
import { RouterModule } from '@angular/router'; // <--- WAŻNY IMPORT
import { SummaryPipe } from "../../pipes/summary-pipe"; 

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [CommonModule, SummaryPipe, RouterModule], // <--- DODAJEMY RouterModule
  templateUrl: './blog-item-text.html',
  styleUrl: './blog-item-text.scss'
})
export class BlogItemTextComponent {
  @Input() text?: string;
  @Input() id?: string; // <--- DODAJEMY INPUT ID
}