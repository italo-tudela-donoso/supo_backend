import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';

@Injectable()
export class SolicitudService {
  private readonly logger = new Logger(SolicitudService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async solicitud(paramsol: string): Promise<any> {
    const sql = "select integracion_scy.solicitudJSON (:psolicitud) soliupo from dual";
    const binds = {
      psolicitud: {
        type: oracledb.STRING,
        dir: oracledb.BIND_IN,
        val: paramsol.toString(),
      },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // formato de salida
    };

    try {
      const rows = await this.databaseService.open(sql, binds, true, options);
      this.logger.log(`Solicitud obtenida con éxito: ${JSON.stringify(rows)}`);
      return rows;
    } catch (err) {
      this.logger.error("Error al ejecutar solicitud:", err);
      throw new Error("Error al ejecutar solicitud");
    }
  }

}
