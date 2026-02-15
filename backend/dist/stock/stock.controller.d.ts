import { StockService } from './stock.service';
import { CreateMovementDto, UpdateMovementDto } from './dto/stock.dto';
import { StockMovementWithRelations } from '../shared/types';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    findAllMovements(): Promise<StockMovementWithRelations[]>;
    createMovement(data: CreateMovementDto): Promise<StockMovementWithRelations>;
    updateMovement(id: string, data: UpdateMovementDto): Promise<StockMovementWithRelations>;
    removeMovement(id: string): Promise<{
        message: string;
    }>;
}
