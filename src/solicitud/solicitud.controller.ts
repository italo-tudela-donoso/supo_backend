import { Controller, Post, Req, Res } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';

@Controller('solicitud')
export class SolicitudController {

    constructor(private readonly solicitudService: SolicitudService) {}


}
