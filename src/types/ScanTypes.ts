export interface DocumenTypes {
    uid: string;
    ownerId: string;
    imagesUri: string[];
    createdAt: string;
    data: Data;
}

export interface Data {
    document_type: string;
    category: string;
    summary: string;
    people_mentioned: PeopleMentioned[];
    important_dates: ImportantDate[];
    document_number: string;
    address: string;
    requires_action: boolean;
    recommended_action: string;
    importance_level: string;
}

export interface ImportantDate {
    date: string;
    description: string;
}

export interface PeopleMentioned {
    name: string;
    role: string;
}
