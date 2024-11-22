import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidarService {
    validar(req, res) {
        // Lógica para generar JSON
        res.send({ message: 'Autorizado correctamente' });
      }
}
