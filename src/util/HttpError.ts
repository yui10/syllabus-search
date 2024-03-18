export interface IHttpError {
    name: string;
    message: string;
    http: {
        url: string;
        status: number;
        statusText: string;
    }
};
export class HttpError extends Error {
    public readonly http: {
        url: string;
        status: number;
        statusText: string;
    };
    constructor(response: Response) {
        super(response.statusText);
        this.name = "HttpError";
        this.http = {
            url: response.url,
            status: response.status,
            statusText: response.statusText,
        };
    }
    serialize(): IHttpError {
        return {
            name: this.name,
            message: this.message,
            http: {
                url: this.http.url,
                status: this.http.status,
                statusText: this.http.statusText,
            }
        };
    }
}
