import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserResponse } from '../shared/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // Remove senha da resposta
  private excludeSenha(user: any): UserResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(search?: string): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany({
      where: search
        ? { nome: { contains: search, mode: 'insensitive' } }
        : {},
      orderBy: { nome: 'asc' },
    });
    return users.map(user => this.excludeSenha(user));
  }

  async findOne(id: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return this.excludeSenha(user);
  }

  async create(data: CreateUserDto): Promise<UserResponse> {
    // Verifica se email já existe
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new ConflictException('Este email já está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const user = await this.prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        perfil: data.perfil || 'operador',
        senha: hashedPassword,
      },
    });
    return this.excludeSenha(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<UserResponse> {
    // Verifica se usuário existe
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Se está atualizando email, verifica se é único
    if (data.email && data.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser) {
        throw new ConflictException('Este email já está registrado');
      }
    }

    const updateData: any = { ...data };
    if (data.senha) {
      updateData.senha = await bcrypt.hash(data.senha, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
    return this.excludeSenha(updatedUser);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário deletado com sucesso' };
  }
}
