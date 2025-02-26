export default class CustomError {
    message: string;
    status: number;
    constructor({ message, status }: {
        message: any;
        status: any;
    });
}
