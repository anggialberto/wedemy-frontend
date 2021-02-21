import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private http: HttpClient) { }

  getPresence(param: any): Observable<any> {
    return this.http.get<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_PARTICIPANT_PRESENCE_QUERY_PATH}`, { params: param });
  }

  setStatusPresence(data: any) {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_APPROVEMENT_PARTICIPANT_PRESENCE_QUERY_PATH}`, data);
  }

  presence(data: any): Observable<any> {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_PRESENCE_QUERY_PATH}`, data);
  }

}
