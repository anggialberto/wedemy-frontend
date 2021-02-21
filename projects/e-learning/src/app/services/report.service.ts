import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllScore(idDetailClass: string): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_SCORE_QUERY_PATH}/${idDetailClass}`);
  }

  getAllPressence(idDetailClass: string): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_DETAIL_PRESENCE_QUERY_PATH}/${idDetailClass}`);
  }

  getDetailScore(param: any): Observable<any> {
    return this.http.get<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_DETAIL_SCORE_QUERY_PATH}`, { params: param });
  }

  getCertificate(param: any): Observable<any> {
    return this.http.get<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_CERTIFICATE_QUERY_PATH}`, { params: param });
  }

  getPresenceReportByIdModuleRegistration(param: any): any {
    return this.http.get(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_REPORT_DETAIL_PRESENCE_QUERY_PATH}`, { responseType: 'arraybuffer', params: param });
  }

}
