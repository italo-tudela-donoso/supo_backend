import { Controller, Post, Req, Res } from '@nestjs/common';
import { ValidarService } from './validar.service';

@Controller('validar')
export class ValidarController {

    constructor(private readonly ValidarService: ValidarService) {}

    @Post('authorize')
    validar(@Req() req, @Res() res) {
      return this.ValidarService.validar(req, res);
    }
}
