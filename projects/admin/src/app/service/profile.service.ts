import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { Profiles } from '../model/profiles';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfiles(): Observable<Profiles[]> {
    return this.http.get<Profiles[]>(`${API.WEDEMY_HOST_DOMAIN}/profile`)
  }

  updateProfile(formData: FormData): Observable<Responses<Profiles>> {
    return this.http.put<Responses<Profiles>>(`${API.WEDEMY_HOST_DOMAIN}/profile`, formData)
  }

  getProfileById(id: string): Observable<Responses<Profiles>> {
    return this.http.get<Responses<Profiles>>(`${API.WEDEMY_HOST_DOMAIN}/profile/${id}`)
  }
}
