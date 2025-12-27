import { Routes } from '@angular/router';
// Zmieniamy import z Blog na BlogHomeComponent
import { BlogHomeComponent } from './components/blog-home/blog-home'; 
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details';

export const routes: Routes = [
    {
        path: '', // Strona główna
        component: BlogHomeComponent, // <--- TERAZ TU JEST BLOG-HOME
    },
    {
        path: 'blog/detail/:id',
        component: BlogItemDetailsComponent
    }
];