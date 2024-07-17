import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private landaService: LandaService) { }

  getSales(arrParameter = {}) {
    return this.landaService.DataGet('/v1/sales', arrParameter);
  }

  getSaleById(SaleId) {
    return this.landaService.DataGet('/v1/sales/' + SaleId);
  }

  createSale(payload) {
    return this.landaService.DataPost('/v1/sales', payload);
  }

  updateSale(payload) {
    return this.landaService.DataPut('/v1/sales', payload);
  }

  deleteSale(SaleId) {
    return this.landaService.DataDelete('/v1/sales/' + SaleId);
  }
}
