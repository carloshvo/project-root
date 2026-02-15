import { PrismaService } from '../shared/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserResponse } from '../shared/types';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    private excludeSenha;
    findAll(search?: string): Promise<UserResponse[]>;
    findOne(id: number): Promise<UserResponse>;
    create(data: CreateUserDto): Promise<UserResponse>;
    update(id: number, data: UpdateUserDto): Promise<UserResponse>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
