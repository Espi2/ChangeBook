import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CredencialesService } from './credenciales.service';
import { CredencialesController } from './credenciales.controller';
import { Credenciales } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Credenciales])],
  exports: [TypeOrmModule, CredencialesService],
  providers: [CredencialesService],
  controllers: [CredencialesController],
})
export class CredencialesModule {}
