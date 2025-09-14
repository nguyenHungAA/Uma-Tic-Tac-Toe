export interface ApiResponseType<T> {
    data: T[];
    links?: {
        self: string;
    },
    relationships?: {
        self?: string;
    },
    meta: {
        totalItems?: number;
    }
}