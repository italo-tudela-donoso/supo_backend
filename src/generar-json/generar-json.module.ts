import { Module } from '@nestjs/common';
import { GenerarJsonController } from './generar-json.controller';
import { GenerarJsonService } from './generar-json.service';
import { FolioRecupModule } from '../folio-recup/folio-recup.module';
import { SolicitudModule } from '../solicitud/solicitud.module';
import { RegistraresModule } from '../registrares/registrares.module';

@Module({
  imports: [FolioRecupModule, SolicitudModule, RegistraresModule],
  controllers: [GenerarJsonController],
  providers: [GenerarJsonService]
})
export class GenerarJsonModule {}
