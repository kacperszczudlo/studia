import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importy niezbędne dla formularza i *ngIf
  templateUrl: './add-post.html',
  styleUrl: './add-post.scss'
})
export class AddPostComponent implements OnInit {
  
  public isFormVisible: boolean = false;
  public postForm!: FormGroup;

  constructor(private service: DataService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Tworzymy formularz z walidacją
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      text: ['', [Validators.required, Validators.minLength(20)]],
      image: [''] // Pole opcjonalne, bez walidatorów
    });
  }

  // Pokazywanie/ukrywanie formularza
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Wysyłanie danych
  onSubmit(): void {
    if (this.postForm.valid) {
      // Wywołanie serwisu
      this.service.addPost(this.postForm.value).subscribe({
        next: (res) => {
          console.log('Post dodany pomyślnie:', res);
          // Reset formularza
          this.postForm.reset();
          this.isFormVisible = false;
          // Odświeżenie strony, aby zobaczyć nowy post
          window.location.reload();
        },
        error: (err) => {
          console.error('Błąd podczas dodawania posta:', err);
          alert('Wystąpił błąd podczas łączenia z serwerem.');
        }
      });
    } else {
      // Jeśli formularz jest błędny, oznaczamy pola, żeby pokazać komunikaty błędów
      this.postForm.markAllAsTouched();
    }
  }
}