import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // <--- DODANY IMPORT

// Definicja typu dla posta (opcjonalne, ale pomocne)
interface Post {
    title: string;
    text: string;
    image: string;
    id: string;
}

// Początkowa lista postów (jak poprzednio)
const INITIAL_POSTS: Post[] = [
  {
    "title": "Post 1",
    "text": "Baza danych przechowuje informacje w strukturalny sposób.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b5362f53f833c89f6ab"
  },
  // ... (Wklej pozostałe 9 postów, które już masz w pliku)
  {
    "title": "Post 10",
    "text": "Kryptografia zajmuje się zabezpieczaniem danych przed nieautoryzowanym dostępem.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "645e329db1979e2e900a94d5"
  },
  {
    "title": "Post 2",
    "text": "Baza danych przechowuje informacje w strukturalny sposób.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b6062f53f833c89f6ac"
  },
  {
    "title": "Post 3",
    "text": "Sieć komputerowa umożliwia przesyłanie danych między urządzeniami.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b6362f53f833c89f6ad"
  },
  {
    "title": "Post 4",
    "text": "Cyberbezpieczeństwo jest ważne w dzisiejszej erze cyfrowej.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b6662f53f833c89f6ae"
  },
  {
    "title": "Post 5",
    "text": "Algorytmy są podstawą rozwiązywania problemów informatycznych.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b6962f53f833c89f6af"
  },
  {
    "title": "Post 6",
    "text": "Chmura obliczeniowa umożliwia przechowywanie danych online.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b6d62f53f833c89f6b0"
  },
  {
    "title": "Post 7",
    "text": "Aplikacja mobilna ułatwia korzystanie z usług na smartfonie.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b7062f53f833c89f6bl"
  },
  {
    "title": "Post 8",
    "text": "Sztuczna inteligencja rewolucjonizuje wiele dziedzin, w tym medycynę i transport.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b7362f53f833c89f6b2"
  },
  {
    "title": "Post 9",
    "text": "Programowanie to sztuka tworzenia oprogramowania.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "64549b7762f53f833c89f6b3"
  },
  {
    "title": "Post 10",
    "text": "Kryptografia zajmuje się zabezpieczaniem danych przed nieautoryzowanym dostępem.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "id": "645e329db1979e2e900a94d5"
  }
];

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 1. Przechowuje aktualną listę postów jako strumień danych
  private postsSubject = new BehaviorSubject<Post[]>(INITIAL_POSTS);

  // 2. Publiczny strumień (Observable) do subskrypcji przez komponenty
  public posts$: Observable<Post[]> = this.postsSubject.asObservable();

  constructor() { }

  // 3. Metoda do udostępniania danych (komponent subskrybuje ten strumień)
  public getAll(): Observable<Post[]> {
    return this.posts$;
  }

  // 4. Metoda dodająca nowy post i EMITUJĄCA (wysyłająca) nową listę
  public addPost(post: { title: string, text: string }) {
    const newId = Date.now().toString();
    
    const newPost: Post = {
      title: post.title,
      text: post.text,
      image: "https://via.placeholder.com/150/1981F3/FFFFFF?text=NEW",
      id: newId
    };
    
    // Tworzenie NOWEJ listy postów (nowy post na początku)
    const currentPosts = this.postsSubject.getValue();
    const updatedPosts = [newPost, ...currentPosts];

    // Wysyłanie nowej listy do wszystkich subskrybentów
    this.postsSubject.next(updatedPosts);
  }
}