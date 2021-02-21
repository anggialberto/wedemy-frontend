import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { Approvements } from '../model/approvements';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovementService {

  constructor(private http: HttpClient) {
  }

  getApprovements(): Observable<Responses<Approvements[]>> {
    return this.http.get<Responses<Approvements[]>>(`${API.WEDEMY_HOST_DOMAIN}/approvement`)
  }

  insertApprovement(approvement: Approvements): Observable<Responses<Approvements>> {
    return this.http.post<Responses<Approvements>>(`${API.WEDEMY_HOST_DOMAIN}/approvement`, approvement)
  }

  updateApprovement(approvement: Approvements): Observable<Responses<Approvements>> {
    return this.http.put<Responses<Approvements>>(`${API.WEDEMY_HOST_DOMAIN}/approvement`, approvement);
  }

  deleteById(id: string, idUser: string): Observable<Responses<Approvements>> {
    return this.http.delete<Responses<Approvements>>(`${API.WEDEMY_HOST_DOMAIN}/approvement?id=${id}&idUser=${idUser}`)
  }
}
