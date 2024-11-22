import { Injectable, HttpStatus } from '@nestjs/common';
import { FolioRecupService } from '../folio-recup/folio-recup.service';
import { SolicitudService } from '../solicitud/solicitud.service';
import { RegistraresService } from '../registrares/registrares.service';
import axios from 'axios';

@Injectable()
export class GenerarJsonService {
  constructor(
    private readonly recupFolioService: FolioRecupService,
    private readonly solicitudService: SolicitudService,
    private readonly registraresService: RegistraresService,
  ) {}

  async generarJson() {
    console.log('generarJson - folio');
    let folios = await this.recupFolioService.recupFolio();
    let cod = HttpStatus.OK;
    let msg = 'Fin Proceso';

    if (folios) {
      console.log(' ....ENTRO EN IF FOLIOS... ');
      for (const lisfolios of folios) {
        console.log('generarJson - lisfolios: ' + lisfolios.FOLIO);
        let jsonSolicitud = await this.solicitudService.solicitud(lisfolios.FOLIO);

        if (!jsonSolicitud) {
          cod = HttpStatus.INTERNAL_SERVER_ERROR;
          msg = 'Error al generar solicitud';
          await this.registraresService.registrares(
            lisfolios.FOLIO,
            '',
            JSON.stringify({ error: msg }),
            'ERROR',
            '',
          );
          console.log("=== ERROR - FIN REGISTRO ERROR =============");
        } else {
          const data = jsonSolicitud[0].SOLIUPO;
          const config = {
            method: 'post',
            url: 'https://prod-36.eastus2.logic.azure.com:443/workflows/35e181b91f26476a9089f93c9310026f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i6VkPbMDgMcj9ApInExsPfOLwoQ4n6g5Ijt1-oKNnmc',
            headers: {
              ApiKey: 'S3hVc2VyQWRtaW46Kkt4MTIzNDU2U2MyMDIyKis=',
              'Content-Type': 'application/json',
            },
            data,
          };

          try {
            const response = await axios(config);
            let codres = response.data.StatusCode;

            if (codres === 200) {
              console.log('200 -- CODERES ------------>>', codres);
              await this.registraresService.registrares(
                lisfolios.FOLIO,
                jsonSolicitud[0].SOLIUPO,
                JSON.stringify(response.data),
                'OK',
                response.data.Data_Response.ID_Solicitud_SC,
              );
            } else {
              console.log('NO - 200 -- CODERES ------------>>', codres);
              await this.registraresService.registrares(
                lisfolios.FOLIO,
                jsonSolicitud[0].SOLIUPO,
                JSON.stringify(response.data),
                `ERR-${codres}`,
                '',
              );
            }
          } catch (error) {
            cod = error.response?.data?.StatusCode || HttpStatus.INTERNAL_SERVER_ERROR;
            msg = error.response?.data?.StatusDetails || 'Error desconocido';

            await this.registraresService.registrares(
              lisfolios.FOLIO,
              jsonSolicitud[0].SOLIUPO,
              JSON.stringify(error.response?.data || { error: msg }),
              'ERROR',
              '',
            );
            console.log("=== ERROR - FIN REGISTRO ERROR =============");
          }
        }
      }
    }
    console.log(' ....FIN PROCESO FOLIOS...: ', msg);
    return { codigo: cod, mensaje: msg };
  }

}
