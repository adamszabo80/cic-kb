import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { KbArticle } from '../models/kb-article.model';

@Injectable({
    providedIn: 'root'
})
export class KbService {
    private articlesUrl = 'kb-articles.json'; // Relative to public/assets or root depending on build
    // In Angular 18+ with public folder, it's served at root.

    constructor(private http: HttpClient) { }

    getArticles(): Observable<KbArticle[]> {
        return this.http.get<KbArticle[]>(this.articlesUrl);
    }

    getArticle(id: string): Observable<KbArticle | undefined> {
        return this.getArticles().pipe(
            map(articles => articles.find(a => a.id === id))
        );
    }

    searchArticles(query: string): Observable<KbArticle[]> {
        const lowerQuery = query.toLowerCase();
        return this.getArticles().pipe(
            map(articles => articles.filter(a =>
                a.title.toLowerCase().includes(lowerQuery) ||
                a.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                a.symptom.toLowerCase().includes(lowerQuery)
            ))
        );
    }
}
