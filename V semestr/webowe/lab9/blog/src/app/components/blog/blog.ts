import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common"; 
import { DataService } from "../../services/data"; 
import { BlogItemComponent } from "../blog-item/blog-item"; 
import { AddPostComponent } from '../add-post/add-post';
import { Observable } from 'rxjs'; // <--- DODANY IMPORT

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, AddPostComponent], 
  providers: [DataService],
  templateUrl: './blog.html', 
  styleUrl: './blog.scss' 
})
export class Blog implements OnInit { 
  // 1. Zmieniamy 'items' na 'items$' (konwencja dla Observable)
  public items$!: Observable<any[]>; 

  constructor (private service: DataService) { 
  }

  ngOnInit() {
    // 2. Przypisujemy Observable zamiast subskrybować i przypisywać wartość
    this.items$ = this.service.getAll(); 
  }
}