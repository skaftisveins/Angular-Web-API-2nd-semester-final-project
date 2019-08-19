export interface Token {
    admin?: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
    userId: string;
    '.issued': string;
    '.expires': string;
}
