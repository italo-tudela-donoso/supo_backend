import { Controller, Res, Get, HttpStatus  } from '@nestjs/common';
import { FolioRecupService } from './folio-recup.service';
import { Response } from 'express';

@Controller('folio-recup')
export class FolioRecupController {

    constructor(private readonly folioRecupService : FolioRecupService) {}

    @Get('folioRecup')
    async recupFolio(@Res() res: Response): Promise<any> {
      try {
        const rows = await this.folioRecupService.recupFolio();
        return res.status(HttpStatus.OK).json(rows);
      } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error al recuperar los folios',
          error: err.message,
        });
      }
    }
}


