import { Injectable } from '@nestjs/common';

@Injectable()
export class AutorizaService {
    authorize(req, res) {
        // Lógica para generar JSON
        res.send({ message: 'Autorizado correctamente' });
      }
}
