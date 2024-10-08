import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/createUserDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './DTO/updatePutUserDto';
import { UpdatePatchUserDto } from './DTO/updatePatchUserDto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
        data,
        select:{
            name: true,
            email: true,
            birthAt: true,
        }
    })
  }
  async list() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number){
    return this.prisma.user.findUnique({
        where: {
            id,
        }
    })
  }

  async update(id: number, data: UpdatePutUserDto){
    await this.exists(id)
    if(!data.birthAt){
        data.birthAt = null
    }
    
    return await this.prisma.user.update({
        data,
        where: {
            id
        }
    })
  }

  async updatePartial(id: number, data: UpdatePatchUserDto){
    await this.exists(id)
    return await this.prisma.user.update({
        data,
        where: {
            id
        }
    })
  }

  async delete(id: number){
    await this.exists(id);
    return await this.prisma.user.delete({
      where:{
        id
      }
    })
  }

  async exists(id: number){
    if (!(await this.getUserById(id))){
      throw new HttpException(`id ${id} não existente`, HttpStatus.NOT_FOUND);
    }
  }
}