import { UserService } from '../application/user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: CreateUserDto): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
    findAll(): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    } | null>;
    update(id: string, dto: UpdateUserDto): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
}
