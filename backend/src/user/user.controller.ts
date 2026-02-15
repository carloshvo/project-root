import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserResponse } from '../shared/types';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(@Query('search') search?: string): Promise<UserResponse[]> {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.usersService.findOne(userId);
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UserResponse> {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.usersService.update(userId, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.usersService.remove(userId);
  }
}