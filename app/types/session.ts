//Dette er en type som er det samme som vores data fra supabase
export type Session = {
    id: string;
    starts_at: string;
    ends_at: string;
    title: string;
    description?: string;
    location?: string;
    owner: string;
};

//Dette er en type som er en del af Session, og er den vi skal bruge når vi sender data til supabase
export type newSession = Omit<Session, "id">;