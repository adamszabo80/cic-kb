const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'kb-articles.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const articles = JSON.parse(data);

    // Find max OUT ID
    let maxId = 0;
    articles.forEach(article => {
        if (article.id.startsWith('OUT-')) {
            const num = parseInt(article.id.split('-')[1], 10);
            if (num > maxId) maxId = num;
        }
    });

    const newId = `OUT-${String(maxId + 1).padStart(3, '0')}`;
    console.log(`Creating new article with ID: ${newId}`);

    const newArticle = {
        id: newId,
        title: "E-Mails in Outlook nicht auffindbar",
        category: "Outlook",
        symptom: "Benutzer kann bestimmte E-Mails im Posteingang oder in Unterordnern nicht finden.",
        causes: "Versehentliches Verschieben, falsche Filter/Ansichten, gelöschte Elemente, oder Synchronisierungsprobleme.",
        questions: [
            {
                text: "Haben Sie den Ordner 'Gelöschte Elemente' überprüft?",
                type: "boolean"
            },
            {
                text: "Haben Sie die Suchfunktion verwendet, um nach dem Betreff oder Absender zu suchen?",
                type: "boolean"
            },
            {
                text: "Wann haben Sie die E-Mail zuletzt gesehen?",
                type: "text"
            },
            {
                text: "Nutzen Sie Outlook im Web (OWA) oder die Desktop-App?",
                type: "choice",
                options: [
                    "Desktop",
                    "Web",
                    "Mobile"
                ]
            },
            {
                text: "Haben Sie Filter wie 'Ungelesen' oder 'An mich' aktiviert?",
                type: "boolean"
            }
        ],
        steps: [
            "Überprüfen Sie die Regeln im Outlook-Client und in OWA auf automatische Verschiebungen.",
            "Starten Sie Outlook mit dem Parameter 'outlook.exe /cleanviews', um Ansichtsfilter zu löschen.",
            "Prüfen Sie den Synchronisierungsstatus in der Statusleiste unten rechts.",
            "Erstellen Sie ein neues Outlook-Profil, falls die OST-Datei beschädigt ist.",
            "Führen Sie eine erweiterte Suche (Strg+Umschalt+F) durch, um versteckte Elemente zu finden."
        ],
        tags: [
            "outlook",
            "email",
            "suche",
            "verschwunden",
            "sync"
        ],
        l1_steps: [
            "Prüfen Sie den Ordner 'Wiederherstellbare Elemente' im Reiter 'Ordner'.",
            "Setzen Sie die Ansichtseinstellungen zurück (Ansicht > Ansicht zurücksetzen)."
        ]
    };

    articles.push(newArticle);

    fs.writeFileSync(filePath, JSON.stringify(articles, null, 4), 'utf8');
    console.log('Article added successfully!');

} catch (err) {
    console.error('Error:', err);
}
