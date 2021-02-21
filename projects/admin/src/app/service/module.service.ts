import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { Modules } from '../model/modules';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<Responses<Modules[]>> {
    return this.http.get<Responses<Modules[]>>(`${API.WEDEMY_HOST_DOMAIN}/module`)
  }

  insertModules(module: Modules): Observable<Responses<Modules>> {
    return this.http.post<Responses<Modules>>(`${API.WEDEMY_HOST_DOMAIN}/module`, module)
  }

  updateModule(module: Modules): Observable<Responses<Modules>> {
    return this.http.put<Responses<Modules>>(`${API.WEDEMY_HOST_DOMAIN}/module`, module)
  }

  deleteById(id: string, idUser: string): Observable<Responses<Modules>> {
    return this.http.delete<Responses<Modules>>(`${API.WEDEMY_HOST_DOMAIN}/module?id=${id}&idUser=${idUser}`)
  }
}
