const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/kb-articles.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const articles = JSON.parse(rawData);

// Specific mapping for "Choice" questions
const choiceMappings = [
    {
        keywords: ['PC generell langsam', 'nur Outlook'],
        options: ['Nur Outlook', 'Ganzer PC', 'Unsicher']
    },
    {
        keywords: ['interne oder externe'],
        options: ['Intern', 'Extern', 'Beides']
    },
    {
        keywords: ['Outlook-App', 'native Mail-App'],
        options: ['Outlook App', 'Native Mail-App', 'Andere']
    },
    {
        keywords: ['WLAN', 'LAN', 'Kabel'],
        options: ['WLAN', 'LAN (Kabel)', 'Mobilfunk']
    },
    {
        keywords: ['Homeoffice', 'Büro'],
        options: ['Homeoffice', 'Büro', 'Unterwegs']
    },
    {
        keywords: ['OWA', 'Outlook'],
        options: ['Nur OWA', 'Nur Outlook', 'Beides']
    }
];

// Keywords for "Text" questions
const textKeywords = [
    'Wie groß', 'Fehlermeldung', 'Version', 'Build-Nummer', 'Name', 'Adresse', 'URL', 'Code', 'Welches Add-In', 'NDR'
];

const updatedArticles = articles.map(article => {
    if (article.questions && Array.isArray(article.questions)) {
        article.questions = article.questions.map(q => {
            let text = typeof q === 'string' ? q : q.text;
            let type = 'boolean';
            let options = undefined;

            // 1. Check for Choice Mappings
            const choiceMatch = choiceMappings.find(m => m.keywords.every(k => text.includes(k)));
            if (choiceMatch) {
                type = 'choice';
                options = choiceMatch.options;
            }
            // 2. Check for Text Keywords
            else if (textKeywords.some(k => text.includes(k))) {
                type = 'text';
            }

            return {
                text: text,
                type: type,
                options: options
            };
        });
    }
    return article;
});

fs.writeFileSync(filePath, JSON.stringify(updatedArticles, null, 4), 'utf8');
console.log('KB Articles smartly transformed.');
