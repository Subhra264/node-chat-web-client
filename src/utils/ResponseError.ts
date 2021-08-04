export interface ResponseErrorJSON{
    status: number;
    message: string;
    code?: string;
}

export default class ResponseError extends Error {
    public status: number;
    public code?: string;
    public isResponseError: boolean;

    constructor (responseError: ResponseErrorJSON) {
        super(responseError.message);
        this.status = responseError.status;
        this.code = responseError.code; 
        this.isResponseError = true;
    }
}