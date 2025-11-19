import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ArticleComponent } from './features/article/article.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'article/:id', component: ArticleComponent },
    { path: '**', redirectTo: '' }
];
