import { PrismaService } from '../shared/prisma.service';
import { CreateMovementDto, UpdateMovementDto } from './dto/stock.dto';
import { StockMovementWithRelations } from '../shared/types';
export declare class StockService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllMovements(): Promise<StockMovementWithRelations[]>;
    createMovement(data: CreateMovementDto): Promise<StockMovementWithRelations>;
    updateMovement(id: number, data: UpdateMovementDto): Promise<StockMovementWithRelations>;
    removeMovement(id: number): Promise<{
        message: string;
    }>;
}
