import { PrismaService } from '../infrastructure/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
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
    findOne(id: number): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    } | null>;
    update(id: number, dto: any): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        nome: string;
        email: string;
        senha: string;
        perfil: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
}
