import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private landaService: LandaService) { }

  getSales(arrParameter = {}){
    return this.landaService.DataGet('/v1/sales', arrParameter)
  }
}
