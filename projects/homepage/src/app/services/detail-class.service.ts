import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { DetailClassInformation } from '@bootcamp-homepage/models/detail-class-information';
import { DetailClasses } from '@bootcamp-homepage/models/detail-classes';
import { Responses } from '@bootcamp-homepage/models/responses';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DetailClassService extends BaseService{

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  getAll(): Observable<Responses<DetailClasses[]>> {
    return this.http.get<Responses<DetailClasses[]>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class`)
  }

  getById(idDtlClass: string): Observable<Responses<DetailClasses>> {
    return this.http.get<Responses<DetailClasses>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class/${idDtlClass}`)
  }

  getPopularClass(): Observable<Responses<DetailClasses[]>> {
    return this.http.get<Responses<DetailClasses[]>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class/popular`)
  }
  
  getInformation(idDtlClass: string): Observable<Responses<DetailClassInformation>> {
    return this.http.get<Responses<DetailClassInformation>>(`${API.WEDEMY_HOST_DOMAIN}/detail-class/information/${idDtlClass}`)
  }
}
