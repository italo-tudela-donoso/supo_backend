import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as oracledb from 'oracledb';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  private readonly dbConfig = { 
    user: process.env.USERDB,
    password: process.env.PASSDB ,
    connectString: process.env.CONNDB, 
  };

  private connection : oracledb.connection | null = null;

  async onModuleInit() {
    try {
      // Inicializa el cliente Oracle en modo Thick
      oracledb.initOracleClient({ libDir: 'C:\\instantclient_21_10' }); // Cambia la ruta según tu instalación
      this.connection = await oracledb.getConnection(this.dbConfig);
      console.log('Cliente Oracle inicializado correctamente');
    } catch (err) {
      console.error('Error inicializando el cliente Oracle:', err);
      throw err;
    }
  }

   // Método para abrir una conexión y ejecutar la consulta
   async open(sql: string, binds: any = [], dml: boolean = false, options: oracledb.ExecuteOptions = {}): Promise<any> {
    let connection;
    try {
      // Abrir conexión
      connection = await oracledb.getConnection(this.dbConfig);
      this.logger.log(`Ejecutando SQL: ${sql}`);
      
      // Ejecutar consulta
      const result = await connection.execute(sql, binds, options);

      // Configuración para recuperar CLOB como string
      oracledb.fetchAsString = [oracledb.CLOB];
      
      // Obtener filas según sea DML o SELECT con cursor
      if (dml === false && result.outBinds && result.outBinds.cursor) {
        const resultSet = result.outBinds.cursor;
        const rows = await resultSet.getRows(1000);
        return rows;
      } else {
        return result.rows;
      }
    } catch (error) {
      this.logger.error(`Error ejecutando consulta: ${error.message}`, error.stack);
      throw new Error('Error al ejecutar la consulta');
    } finally {
      if (connection) {
        try {
          await connection.close();
          this.logger.log('Conexión cerrada');
        } catch (closeError) {
          this.logger.error('Error cerrando conexión', closeError);
        }
      }
    }
  }
}
