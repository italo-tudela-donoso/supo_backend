import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigModule], // Importa ConfigModule para cargar variables de entorno
  providers: [DatabaseService],
  exports: [DatabaseService], // Exporta el servicio para su uso en otros módulos
})
export class DatabaseModule {}
