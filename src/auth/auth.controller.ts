import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthForgetDTO } from "src/user/DTO/auth-forget-dto";
import { AuthLoginDTO } from "src/user/DTO/auth-login-dto";
import { AuthRegisterDTO } from "src/user/DTO/auth-register-dto";
import { UserService } from "src/user/user.service";

import { AuthResetDTO } from "src/user/DTO/auth.-reset-dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body(){email, password}: AuthLoginDTO){
        return await this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body()data: AuthRegisterDTO){
        return await this.authService.register(data)
    }

    @Post('forget')
    async forget(@Body(){email}: AuthForgetDTO){}

    @Post('reset')
    async reset(@Body(){password, token}: AuthResetDTO){
        return await this.authService.reset(password, token)
    }

    @Post('me')
    async me(@Body()body){
        return await this.authService.checkToken(body.token);
    }
}