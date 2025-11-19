import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KbService } from '../../core/services/kb.service';
import { KbArticle } from '../../core/models/kb-article.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    articles: KbArticle[] = [];
    filteredArticles: KbArticle[] = [];
    searchQuery: string = '';
    tags: { name: string, count: number, color: string, size: number }[] = [];

    searchPlaceholder: string = 'Suche nach...';
    private placeholders: string[] = ['Suche nach...', 'Los geht\'s...', 'Thema?'];
    private placeholderIndex: number = 0;
    // Palette matching the #afb996 theme
    private colors: string[] = ['#afb996', '#7d8666', '#d4a373', '#e6be96', '#64748b', '#2c3e50', '#5d6d7e', '#aab7b8'];

    constructor(private kbService: KbService) { }

    ngOnInit(): void {
        this.kbService.getArticles().subscribe(articles => {
            this.articles = articles;
            this.filteredArticles = articles;
            this.generateWordCloud();
        });

        // Rotate placeholder every 6 seconds
        setInterval(() => {
            this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholders.length;
            this.searchPlaceholder = this.placeholders[this.placeholderIndex];
        }, 6000);
    }

    onSearch(): void {
        if (!this.searchQuery) {
            this.filteredArticles = this.articles;
        } else {
            const lowerQuery = this.searchQuery.toLowerCase();
            this.filteredArticles = this.articles.filter(a =>
                a.title.toLowerCase().includes(lowerQuery) ||
                a.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                a.symptom.toLowerCase().includes(lowerQuery)
            );
        }
    }

    filterByTag(tag: string): void {
        this.searchQuery = tag;
        this.onSearch();
    }

    generateWordCloud(): void {
        const tagCounts: { [key: string]: number } = {};
        this.articles.forEach(article => {
            article.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        const sortedTags = Object.keys(tagCounts)
            .map(tag => ({
                name: tag,
                count: tagCounts[tag]
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20); // Limit to top 20

        // Assign random colors and sizes for "fancy" look
        this.tags = sortedTags.map(t => ({
            ...t,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            size: 0.9 + (Math.random() * 1.3) // Random size between 0.9em and 2.2em
        }));
    }
}
