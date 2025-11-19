const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/kb-articles.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const articles = JSON.parse(rawData);

const updatedArticles = articles.map(article => {
    if (article.questions && Array.isArray(article.questions)) {
        article.questions = article.questions.map(q => {
            // If q is already an object, keep it (idempotency)
            if (typeof q === 'object') return q;

            // Default to boolean
            let type = 'boolean';

            // Check for specific questions that need text input
            const textKeywords = [
                'Wie groß', 'Fehlermeldung', 'Version', 'Build-Nummer', 'Name', 'Adresse', 'URL', 'Code'
            ];

            if (textKeywords.some(keyword => q.includes(keyword))) {
                type = 'text';
            }

            return {
                text: q,
                type: type
            };
        });
    }
    return article;
});

fs.writeFileSync(filePath, JSON.stringify(updatedArticles, null, 4), 'utf8');
console.log('KB Articles transformed successfully.');
