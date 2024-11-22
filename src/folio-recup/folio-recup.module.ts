import { Module } from '@nestjs/common';
import { FolioRecupService } from './folio-recup.service';
import { FolioRecupController } from './folio-recup.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FolioRecupService],
  controllers: [FolioRecupController],
  exports: [FolioRecupService],
})
export class FolioRecupModule {}
