import { Module } from '@nestjs/common';
import { MaterialsController } from './material.controller';
import { MaterialsService } from './material.service';
import { PrismaService } from '../shared/prisma.service';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, PrismaService],
})
export class MaterialModule { }