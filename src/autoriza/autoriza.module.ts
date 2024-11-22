import { Module } from '@nestjs/common';
import { AutorizaService } from './autoriza.service';
import { AutorizaController } from './autoriza.controller';

@Module({
  providers: [AutorizaService],
  controllers: [AutorizaController]
})
export class AutorizaModule {}
