import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./DTO/createUserDto";
import { UpdatePutUserDto } from "./DTO/updatePutUserDto";
import { UserService } from "./user.service";
import { UpdatePatchUserDto } from "./DTO/updatePatchUserDto";
import { logInterceptor } from "src/interceptors/interceptors";


//@UseInterceptors(logInterceptor)
@Controller('users')
export class UserController {
    constructor (private readonly userService: UserService){}
    @Post()
    async create(@Body() data: CreateUserDto ){
       return await this.userService.create(data);
    }

    @Get()
    async list(){
        return await  this.userService.list()
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number ){
        const user = await this.userService.getUserById(id);
        if (!user){
            throw new HttpException(`id ${id} não existente`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Put(':id')
    async update(@Body()body: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number){
        return await this.userService.update(id, body);
    }

    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchUserDto, @Param('id', ParseIntPipe) id: number){
        return await this.userService.updatePartial(id, body)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id ){
        return this.userService.delete(id)
    } 
}