import { PrismaService } from '../shared/prisma.service';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
import { Material } from '../shared/types';
export declare class MaterialsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string): Promise<Material[]>;
    findOne(id: number): Promise<Material>;
    create(data: CreateMaterialDto): Promise<Material>;
    update(id: number, data: UpdateMaterialDto): Promise<Material>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
