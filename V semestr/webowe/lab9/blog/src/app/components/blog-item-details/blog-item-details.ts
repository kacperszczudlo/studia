import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Dodaj RouterModule dla przycisku "Wróć"
import { DataService } from '../../services/data';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // POPRAW TUTAJ NAZWĘ PLIKU (usuń .component jeśli plik go nie ma)
  templateUrl: './blog-item-details.html', 
  styleUrl: './blog-item-details.scss'
})
export class BlogItemDetailsComponent implements OnInit {
  // ... reszta kodu bez zmian (image, text, constructor, ngOnInit) ...
  image: string = '';
  text: string = '';

  constructor(private service: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.service.getById(id).subscribe(res => {
          if (res) {
            this.image = res.image;
            this.text = res.text;
          }
        });
      }
    });
  }
}