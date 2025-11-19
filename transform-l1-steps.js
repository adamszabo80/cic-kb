const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'kb-articles.json');

// Define L1.5 steps for each article ID
const l1StepsMapping = {
    // Outlook
    "OUT-001": [
        "Starten Sie Outlook im abgesicherten Modus (Windows-Taste + R, dann 'outlook.exe /safe' eingeben).",
        "Erstellen Sie ein neues Outlook-Profil über die Systemsteuerung (Mail > Profile anzeigen > Hinzufügen)."
    ],
    "OUT-002": [
        "Prüfen Sie Ihre Internetverbindung, indem Sie eine Webseite im Browser öffnen.",
        "Starten Sie den Computer neu und versuchen Sie es erneut."
    ],
    "OUT-003": [
        "Prüfen Sie, ob die Email im 'Postausgang' liegt und löschen Sie sie ggf., falls sie blockiert.",
        "Starten Sie Outlook neu und prüfen Sie unten rechts den Verbindungsstatus."
    ],
    "OUT-004": [
        "Prüfen Sie den Ordner 'Junk-E-Mail' und 'Gelöschte Elemente'.",
        "Schauen Sie im Outlook Web Access (OWA) nach, ob die Mail dort sichtbar ist."
    ],
    "OUT-005": [
        "Melden Sie sich in Office ab (Datei > Office-Konto > Abmelden) und wieder an.",
        "Löschen Sie gespeicherte Anmeldeinformationen in der Windows-Anmeldeinformationsverwaltung."
    ],
    "OUT-006": [
        "Deaktivieren Sie testweise alle Add-Ins (Datei > Optionen > Add-Ins).",
        "Starten Sie den PC neu, um den Arbeitsspeicher zu leeren."
    ],
    "OUT-007": [
        "Prüfen Sie, ob Updates für Office verfügbar sind (Datei > Office-Konto > Updateoptionen).",
        "Nutzen Sie die Suche im Outlook Web Access (OWA) als vorübergehende Lösung."
    ],
    "OUT-008": [
        "Entfernen Sie das Konto auf dem mobilen Gerät und fügen Sie es neu hinzu.",
        "Installieren Sie die Outlook-App neu."
    ],
    "OUT-009": [
        "Warten Sie bis zu 60 Minuten, da Berechtigungen Zeit zur Synchronisierung benötigen.",
        "Starten Sie Outlook neu."
    ],
    "OUT-010": [
        "Starten Sie Outlook im abgesicherten Modus, um zu prüfen, ob das Problem weg ist.",
        "Deaktivieren Sie das zuletzt installierte Add-In."
    ],

    // Exchange
    "EXC-001": [
        "Prüfen Sie, ob Sie eine Unzustellbarkeitsnachricht (NDR) erhalten haben.",
        "Fragen Sie den Empfänger, ob die Mail im Spam-Ordner gelandet ist."
    ],
    "EXC-002": [
        "Prüfen Sie, ob die Weiterleitung im OWA (Einstellungen > Mail > Weiterleitung) aktiv ist.",
        "Testen Sie eine manuelle Weiterleitung einer einzelnen Mail."
    ],
    "EXC-003": [
        "Prüfen Sie, ob die Mail Anhänge oder Links enthält, die als Spam gewertet werden könnten.",
        "Bitten Sie den Empfänger, Ihre Adresse zur 'Sicheren Absenderliste' hinzuzufügen."
    ],
    "EXC-004": [
        "Markieren Sie die Mail als 'Kein Junk' (Rechtsklick > Junk-E-Mail > Keine Junk-E-Mail).",
        "Blockieren Sie den Absender, falls es sich um offensichtlichen Spam handelt."
    ],
    "EXC-005": [
        "Prüfen Sie, ob das Email-Format auf 'HTML' eingestellt ist.",
        "Senden Sie eine Test-Mail an sich selbst, um die Signatur zu prüfen."
    ],

    // OneDrive
    "OD-001": [
        "Starten Sie die OneDrive-App neu (Rechtsklick auf Taskleisten-Icon > OneDrive schließen).",
        "Prüfen Sie, ob Sie sich im Webportal (portal.office.com) anmelden können."
    ],
    "OD-002": [
        "Speichern Sie Ihre Änderungen lokal als Kopie ('Speichern unter').",
        "Benennen Sie die Datei um, um den Konflikt zu lösen."
    ],
    "OD-003": [
        "Prüfen Sie, ob der Energiesparmodus am Laptop aktiv ist (deaktivieren).",
        "Stellen Sie sicher, dass Sie nicht über eine getaktete Verbindung (Hotspot) verbunden sind."
    ],
    "OD-004": [
        "Prüfen Sie den Papierkorb im OneDrive-Webportal.",
        "Nutzen Sie die 'Suchen'-Funktion im Webportal."
    ],
    "OD-005": [
        "Melden Sie sich in den OneDrive-Einstellungen ab und wieder an.",
        "Löschen Sie die OneDrive-Anmeldeinformationen im Windows-Tresor."
    ]
};

try {
    const data = fs.readFileSync(filePath, 'utf8');
    let articles = JSON.parse(data);

    let updatedCount = 0;

    articles = articles.map(article => {
        if (l1StepsMapping[article.id]) {
            article.l1_steps = l1StepsMapping[article.id];
            updatedCount++;
        } else {
            // Default fallback if ID not found (should not happen for current set)
            article.l1_steps = [
                "Starten Sie die Anwendung neu.",
                "Prüfen Sie auf Updates."
            ];
            updatedCount++;
        }
        return article;
    });

    fs.writeFileSync(filePath, JSON.stringify(articles, null, 4), 'utf8');
    console.log(`Successfully updated ${updatedCount} articles with L1.5 steps.`);

} catch (err) {
    console.error('Error processing file:', err);
}
