import { IsEmail, IsJWT, IsString, IsStrongPassword } from "class-validator";

export class AuthResetDTO{
    @IsStrongPassword()
    password: string;
    
    @IsString()
    @IsJWT()
    token: string;
}