import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleRegistrations } from '@bootcamp-admin/model/module-registrations';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleRegistrationService {

  constructor(private http: HttpClient) {
  }

  getModuleRegByIdDtlClass(idDtlClass: string): Observable<Responses<ModuleRegistrations[]>> {
    return this.http.get<Responses<ModuleRegistrations[]>>(`${API.WEDEMY_HOST_DOMAIN}/module-registration/dtl-class/${idDtlClass}`)
  }
}
