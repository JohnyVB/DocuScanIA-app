type Person = { name: string; role: string };

type ImportantDate = { date: string; description: string };

type DocumentData = {
    document_type: string;
    category: string;
    summary: string;
    people_mentioned: Person[];
    important_dates: ImportantDate[];
    document_number: string;
    address: string;
    importance_level: string;
};

export type Props = {
    createdAt: string;
    imagesUri: string[];
    data: DocumentData;
};
