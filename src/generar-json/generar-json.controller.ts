import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { GenerarJsonService } from './generar-json.service';
import { Response } from 'express';

@Controller('generar-json')
export class GenerarJsonController {
    constructor(private readonly generarJsonService: GenerarJsonService) {}

    @Get('generar-json')
  async generarJson(@Res() res: Response) {
    try {
      const result = await this.generarJsonService.generarJson();
      return res.status(result.codigo).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        codigo: HttpStatus.INTERNAL_SERVER_ERROR,
        mensaje: 'Error al generar JSON',
      });
    }
  }


}
