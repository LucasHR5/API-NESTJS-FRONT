import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "src/user/DTO/auth-register-dto";
import { CreateUserDto } from "src/user/DTO/createUserDto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly JWTservice: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ){}

    async createToken(user: User){
         return {
            acessToken: this.JWTservice.sign({
                name: user.name,
                email: user.email
             }, {
                expiresIn: "7 days", //expiração do token
                subject: String(user.id), //Usuario 
                issuer: 'login', //emissor
                audience: 'users' // Quem tem acesso ao nosso token
    
             })
         };
    }

    async checkToken(token: string) {
        return this.JWTservice.verify(token, {
            audience: 'users',
            issuer: 'login'
        });
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });
        if (!user){
            throw new HttpException('Email ou senha invalidos', HttpStatus.UNAUTHORIZED)
        }
        return this.createToken(user);
    }
    
    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user){
            throw new HttpException('Email invalido', HttpStatus.UNAUTHORIZED)
        }
        //to do: -enviar email...
        return true;
    }

    async reset(password: string, token: string){
        //TO DO: Validar o token...
        const id = 0;; //Simulando ter retirado o ID do token
       const user = await this.prisma.user.update({
            where: {
                id,
            },
            data:{
                password,
            }
        });
        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO){      
        const user = await this.prisma.user.create({
           data
        })

        return this.createToken(user);
    }

}