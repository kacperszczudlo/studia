import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// 1. Import dyrektywy (sprawdź czy ścieżka pasuje do Twojej struktury)
import { TextFormatDirective } from '../../directives/text-format'; 

@Component({
  selector: 'app-search-bar',
  standalone: true,
  // 2. Dodanie do imports
  imports: [FormsModule, TextFormatDirective], 
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBarComponent implements OnInit {
  // ... reszta kodu bez zmian ...
  public filterText: string = '';
  @Output() name = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const queryName = params['name'];
      if (queryName) {
        this.filterText = queryName;
        this.name.emit(this.filterText);
      }
    });
  }

  sendFilter(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name: this.filterText ? this.filterText : null },
      queryParamsHandling: 'merge'
    });
    this.name.emit(this.filterText);
  }
}