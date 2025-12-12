import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Dla *ngFor i async pipe
import { Observable } from 'rxjs';
import { DataService } from '../../services/data'; // Używamy 'data' zamiast 'data.service'

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class GalleryComponent implements OnInit {

  // Zmienna przechowująca strumień postów (Observable)
  posts$: Observable<any[]> | undefined;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Pobieramy strumień postów
    this.posts$ = this.dataService.getAll();
  }
}