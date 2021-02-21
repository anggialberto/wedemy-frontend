import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailClasses } from '@bootcamp-admin/model/dtl-classes';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DtlClassService {

  constructor(private http: HttpClient) {
  }

  getDetailClasses(): Observable<Responses<DetailClasses[]>> {
    return this.http.get<Responses<DetailClasses[]>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class`)
  }

  getDetailClassById(id: string): Observable<Responses<DetailClasses>> {
    return this.http.get<Responses<DetailClasses>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class/${id}`)
  }

  getDetailClassInactive(): Observable<Responses<DetailClasses[]>> {
    return this.http.get<Responses<DetailClasses[]>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class/inactive`)
  }

  updateInactiveClass(dtlClass: DetailClasses): Observable<Responses<DetailClasses[]>> {
    return this.http.post<Responses<DetailClasses[]>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class`, dtlClass)
  }

  getDtlClassByIdClass(idClass: string): Observable<Responses<DetailClasses[]>> {
    return this.http.get<Responses<DetailClasses[]>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class/class/${idClass}`)

  }
}
