import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { KbService } from '../../core/services/kb.service';
import { KbArticle } from '../../core/models/kb-article.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-article',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    article: KbArticle | undefined;
    answers: { [key: number]: boolean | string | null } = {};
    notes: string = '';

    constructor(
        private route: ActivatedRoute,
        private kbService: KbService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.kbService.getArticle(id).subscribe(article => {
                    this.article = article;
                    this.answers = {}; // Reset answers
                    this.notes = ''; // Reset notes
                });
            }
        });
    }

    setAnswer(index: number, value: boolean | string): void {
        this.answers[index] = value;
    }

    copyToClipboard(): void {
        if (!this.article) return;

        let text = `Protocol: ${this.article.title} (${this.article.id})\n\n`;

        if (this.article.questions && this.article.questions.length > 0) {
            text += `Triage:\n`;
            this.article.questions.forEach((q, i) => {
                const answer = this.answers[i];
                let answerText = 'Not answered';

                if (typeof answer === 'boolean') {
                    answerText = answer ? 'Yes' : 'No';
                } else if (answer) {
                    answerText = answer.toString();
                }

                text += `- ${q.text}: ${answerText}\n`;
            });
            text += `\n`;
        }
        text += `NOTES:\n${this.notes}\n`;

        navigator.clipboard.writeText(text).then(() => {
            alert('Triage protocol copied to clipboard!');
        });
    }
}
