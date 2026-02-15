import { Module } from '@nestjs/common';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [MaterialModule, UserModule, StockModule],
})
export class AppModule { }