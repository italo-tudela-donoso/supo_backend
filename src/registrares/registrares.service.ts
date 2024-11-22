import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';


@Injectable()
export class RegistraresService {

  private readonly logger = new Logger(RegistraresService.name);
  constructor(private readonly databaseService: DatabaseService) {}


  async registrares(paramfol: string, paramjso: string, paramres: string, paramest: string, paramfsc: string): Promise<any> {
    const sql = "Begin integracion_scy.registra_resultado_api(:pfoli,:pjson,:presp,:pesta,:pfscy); End;";

    // Valores predeterminados en caso de que algunos parámetros sean nulos o vacíos
    const binds = {
      pfoli: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: paramfol || '' },
      pjson: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: paramjso || '' },
      presp: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: paramres || '' },
      pesta: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: paramest || '' },
      pfscy: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: paramfsc || '' },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // formato de salida
    };

    try {
      const rows = await this.databaseService.open(sql, binds, true, options);
      this.logger.log(`Registro insertado con éxito: ${JSON.stringify(rows)}`);
      return rows;
    } catch (err) {
      this.logger.error("Error al ejecutar registrares:", err);
      throw new Error("Error al ejecutar registrares");
    }
  }

}
