import { Module } from '@nestjs/common';
import { ValidarService } from './validar.service';
import { ValidarController } from './validar.controller';

@Module({
  providers: [ValidarService],
  controllers: [ValidarController]
})
export class ValidarModule {}
