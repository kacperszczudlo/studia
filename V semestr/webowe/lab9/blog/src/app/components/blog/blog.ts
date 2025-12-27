import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from "@angular/common"; 
import { DataService } from "../../services/data"; 
import { BlogItemComponent } from "../blog-item/blog-item"; 
import { AddPostComponent } from '../add-post/add-post';
import { Observable } from 'rxjs'; 

// ✅ POPRAWKA: Musimy podać pełną nazwę pliku: filter-text.pipe
import { FilterTextPipe } from '../../pipes/filter-text-pipe'; 

@Component({
  selector: 'blog',
  standalone: true,
  // Dodajemy FilterTextPipe do tablicy imports
  imports: [BlogItemComponent, CommonModule, AddPostComponent, FilterTextPipe], 
  providers: [DataService],
  templateUrl: './blog.html', 
  styleUrl: './blog.scss' 
})
export class Blog implements OnInit { 
  
  @Input() filterText: string = ''; 
  
  public items$!: Observable<any[]>; 

  constructor (private service: DataService) { 
  }

  ngOnInit() {
    this.items$ = this.service.getAll(); 
  }
}