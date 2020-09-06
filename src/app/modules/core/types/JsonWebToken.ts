export interface JsonWebToken {
    sub: string;
    jti: string;
    id: string;
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
}