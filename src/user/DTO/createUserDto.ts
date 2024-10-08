import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, minLength } from "class-validator";

export class CreateUserDto{
    
    
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
    
    @IsOptional()
    @IsDateString()
    birthAt: string | null;
}