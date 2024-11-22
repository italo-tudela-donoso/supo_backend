import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GenerarJsonModule } from './generar-json/generar-json.module';
import { FolioRecupModule } from './folio-recup/folio-recup.module';
import { RegistraresModule } from './registrares/registrares.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { ValidarModule } from './validar/validar.module';
import { AutorizaModule } from './autoriza/autoriza.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [ConfigModule.forRoot(), GenerarJsonModule, FolioRecupModule, RegistraresModule, SolicitudModule, ValidarModule, AutorizaModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
