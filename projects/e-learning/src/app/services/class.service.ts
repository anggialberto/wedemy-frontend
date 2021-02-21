import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  getDetailModule(params: any): Observable<Response<any[]>> {
    let httpParams = new HttpParams()
    for (let key of Object.keys(params)) {
      httpParams = httpParams.set(key, params[key])
    }
    return this.http.get<Response<any[]>>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_CLASS_QUERY_PATH}`, { params: httpParams })
  }

  getDetail(idDetailClass: string): Observable<Response<any>> {
    return this.http.get<Response<any[]>>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_CLASS_DETAIL}/${idDetailClass}`)

  }
}
