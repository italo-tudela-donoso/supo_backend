import { Controller, Post, Req, Res } from '@nestjs/common';
import { AutorizaService } from './autoriza.service';

@Controller('autoriza')
export class AutorizaController {
    constructor(private readonly autorizaService: AutorizaService) {}

    @Post('authorize')
    authorize(@Req() req, @Res() res) {
      return this.autorizaService.authorize(req, res);
    }

}
