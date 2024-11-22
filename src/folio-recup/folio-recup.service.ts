import { Injectable, Logger } from '@nestjs/common';
import * as oracledb from 'oracledb';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class FolioRecupService {

  private readonly logger = new Logger(FolioRecupService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async recupFolio(): Promise<any> {
    console.log("Recuperando Folio...");
   
    const sql = "Begin integracion_scy.RecupFolios(:cursor); End;";
    const binds = {
      cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    try {
      const rows = await this.databaseService.open(sql, binds, false, options);
      this.logger.log("Recuperación de folios completada:", rows);
      return rows;
    } catch (err) {
      this.logger.error("Error en recupFolio:", err);
      throw new Error('Error al recuperar folios');
    }
  }

}
