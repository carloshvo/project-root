import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateMovementDto, UpdateMovementDto } from './dto/stock.dto';
import { StockMovementWithRelations } from '../shared/types';

@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Get('movements')
  async findAllMovements(): Promise<StockMovementWithRelations[]> {
    return this.stockService.findAllMovements();
  }

  @Post('movements')
  async createMovement(@Body() data: CreateMovementDto): Promise<StockMovementWithRelations> {
    return this.stockService.createMovement(data);
  }

  @Put('movements/:id')
  async updateMovement(@Param('id') id: string, @Body() data: UpdateMovementDto): Promise<StockMovementWithRelations> {
    const movementId = Number(id);
    if (isNaN(movementId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.stockService.updateMovement(movementId, data);
  }

  @Delete('movements/:id')
  async removeMovement(@Param('id') id: string): Promise<{ message: string }> {
    const movementId = Number(id);
    if (isNaN(movementId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.stockService.removeMovement(movementId);
  }
}