import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { Roles } from '../model/roles';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${API.WEDEMY_HOST_DOMAIN}/role/all`)
  }
}
