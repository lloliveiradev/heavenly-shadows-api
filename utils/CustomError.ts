export default class CustomError {
    message: string;
    status: number;

    constructor({
        message,
        status
    }) {
        this.message = message;
        this.status = status;
    }
};