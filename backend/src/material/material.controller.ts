import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { MaterialsService } from './material.service';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
import { Material } from '../shared/types';

@Controller('api/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) { }

  @Get()
  async findAll(@Query('search') search?: string): Promise<Material[]> {
    return this.materialsService.findAll(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Material> {
    const materialId = Number(id);
    if (isNaN(materialId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.materialsService.findOne(materialId);
  }

  @Post()
  async create(@Body() data: CreateMaterialDto): Promise<Material> {
    return this.materialsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateMaterialDto): Promise<Material> {
    const materialId = Number(id);
    if (isNaN(materialId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.materialsService.update(materialId, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const materialId = Number(id);
    if (isNaN(materialId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.materialsService.remove(materialId);
  }
}