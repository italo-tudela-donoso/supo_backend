import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SolicitudService],
  controllers: [SolicitudController],
  exports: [SolicitudService],
})
export class SolicitudModule {}
