import { MaterialsService } from './material.service';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
import { Material } from '../shared/types';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    findAll(search?: string): Promise<Material[]>;
    findOne(id: string): Promise<Material>;
    create(data: CreateMaterialDto): Promise<Material>;
    update(id: string, data: UpdateMaterialDto): Promise<Material>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
