import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data'; 

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Wymagane do formularzy reaktywnych
  templateUrl: './add-post.html',
  styleUrl: './add-post.scss'
})
export class AddPostComponent {
  
  // 1. Definicja formularza (FormGroup)
  postForm = new FormGroup({
    title: new FormControl('', [
      Validators.required, 
      Validators.minLength(5)
    ]),
    text: new FormControl('', [
      Validators.required, 
      Validators.minLength(20)
    ])
  });

  // Właściwość pomocnicza do ukrywania/pokazywania formularza
  isFormVisible: boolean = false;
  
  // Wstrzyknięcie DataService
  constructor(private dataService: DataService) { }

  // 2. Metoda obsługująca wysyłkę formularza
  onSubmit() {
    if (this.postForm.valid) {
      // Wywołanie metody dodającej post z serwisu
      this.dataService.addPost({
        title: this.postForm.value.title!, // ! oznacza, że wiemy, że wartość nie jest null (dzięki walidatorowi required)
        text: this.postForm.value.text!
      });

      // Zresetowanie formularza po dodaniu posta
      this.postForm.reset();
      
      // Ukrycie formularza po udanym dodaniu
      this.isFormVisible = false;

      alert('Post został pomyślnie dodany!');

      // UWAGA: Aby zobaczyć nowo dodane posty na liście bloga, 
      // trzeba będzie odświeżyć całą listę postów w komponencie 'blog'.
      // Na razie lista postów jest pobierana tylko w ngOnInit() w 'blog'.
      // W kolejnych krokach (lub jako opcjonalne zadanie) powinniśmy 
      // użyć mechanizmu np. BehaviorSubject, aby lista odświeżała się automatycznie.
    }
  }

  // 3. Metoda do przełączania widoczności formularza
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
}