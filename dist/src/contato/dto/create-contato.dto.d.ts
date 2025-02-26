export declare class CreateContatoDto {
    readonly email: string;
    readonly message: string;
    readonly name: string;
    readonly subject: string;
    get(): {
        email: string;
        message: string;
        name: string;
        subject: string;
    };
}
