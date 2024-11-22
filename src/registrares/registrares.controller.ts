import { Controller, Post, Req, Res } from '@nestjs/common';
import { RegistraresService } from './registrares.service';

@Controller('registrares')
export class RegistraresController {
    constructor(private readonly registraresService: RegistraresService) {}

    }





    