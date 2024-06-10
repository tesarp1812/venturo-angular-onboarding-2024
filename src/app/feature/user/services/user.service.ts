import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private landaService: LandaService) { }

  getUsers(arrParameter = {}) {
    return this.landaService.DataGet('/v1/users', arrParameter);
  }

  getUserById(userId) {
    return this.landaService.DataGet('/v1/users/' + userId);
  }

  updateUser(payload) {
    return this.landaService.DataPut('/v1/users', payload);
  }

  deleteUser(userId) {
    return this.landaService.DataDelete('/v1/users/' + userId);
  }

}
