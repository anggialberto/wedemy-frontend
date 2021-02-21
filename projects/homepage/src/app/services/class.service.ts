import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Classes } from '@bootcamp-homepage/models/classes';
import { BaseService } from './base.service';
import { Responses } from '@bootcamp-homepage/models/responses';
import { TotalClassAndUser } from '@bootcamp-homepage/models/total-class-and-user';
import API from '@bootcamp-core/constants/api';

@Injectable({
  providedIn: 'root'
})
export class ClassService extends BaseService {

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  getAll(): Observable<Responses<Classes[]>> {
    return this.http.get<Responses<Classes[]>>(`${API.WEDEMY_HOST_DOMAIN}/class/active`)
  }

  getById(id: string): Observable<Classes> {
    return this.http.get<Classes>(`${API.WEDEMY_HOST_DOMAIN}/class/${id}`)
  }

  getTotalClassAndUser(): Observable<Responses<TotalClassAndUser>> {
    return this.http.get<Responses<TotalClassAndUser>>(`${API.WEDEMY_HOST_DOMAIN}/class/user`)
  }
  
}
