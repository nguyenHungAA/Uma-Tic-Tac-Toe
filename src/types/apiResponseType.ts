export interface ApiResponseType<T> {
    data: T[];
    links?: {
        self: string;
    }
}