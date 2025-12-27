import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definicja typu dla posta
export interface Post {
    title: string;
    text: string;
    image: string;
    id?: string; // id jest opcjonalne przy tworzeniu (nadaje je baza)
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // ADRES API - Port 3100 (zgodnie z Twoim serwerem backendowym)
  private url = 'http://localhost:3100/api/posts';

  constructor(private http: HttpClient) { }

  // 1. POBIERANIE WSZYSTKICH: Zapytanie GET do API
  public getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  // 2. POBIERANIE JEDNEGO: Zapytanie GET z ID
  public getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  // 3. DODAWANIE: Zapytanie POST z danymi nowego wpisu
  public addPost(post: { title: string, text: string, image: string }): Observable<any> {
    return this.http.post(this.url, post);
  }
}