export interface KbQuestion {
    text: string;
    type: 'boolean' | 'text' | 'choice';
    options?: string[]; // For 'choice' type
}

export interface KbArticle {
    id: string;
    title: string;
    category: string;
    symptom: string;
    causes: string;
    questions: KbQuestion[];
    l1_steps?: string[]; // New L1.5 troubleshooting steps
    steps: string[];
    tags: string[];
}
