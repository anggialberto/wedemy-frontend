import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { Users } from '../model/users';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Responses<Users[]>> {
    return this.http.get<Responses<Users[]>>(`${API.WEDEMY_HOST_DOMAIN}/user`);
  }

  getUserByCode(code: string): Observable<Responses<Users[]>> {
    return this.http.get<Responses<Users[]>>(`${API.WEDEMY_HOST_DOMAIN}/user/role/${code}`);
  }

  getUserById(id: string): Observable<Responses<Users>> {
    return this.http.get<Responses<Users>>(`${API.WEDEMY_HOST_DOMAIN}/user/${id}`);
  }

  insertUsers(user: Users): Observable<Responses<Users>> {
    return this.http.post<Responses<Users>>(`${API.WEDEMY_HOST_DOMAIN}/user`, user);
  }

  deleteById(id: string, idUser: string): Observable<Responses<Users>> {
    return this.http.delete<Responses<Users>>(`${API.WEDEMY_HOST_DOMAIN}/user?id=${id}&idUser=${idUser}`)
  }

  updateUser(user: Users): Observable<Responses<Users>> {
    return this.http.patch<Responses<Users>>(`${API.WEDEMY_HOST_DOMAIN}/user`, user);
  }

}
