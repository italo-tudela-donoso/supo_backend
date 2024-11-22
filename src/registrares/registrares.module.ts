import { Module } from '@nestjs/common';
import { RegistraresService } from './registrares.service';
import { RegistraresController } from './registrares.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RegistraresService],
  exports: [RegistraresService],
  controllers: [RegistraresController],
})
export class RegistraresModule {}
