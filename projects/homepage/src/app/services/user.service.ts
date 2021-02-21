import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { Profiles } from '@bootcamp-homepage/models/profiles';
import { Responses } from '@bootcamp-homepage/models/responses';
import { Users } from '@bootcamp-homepage/models/users';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  insertUser(participant: Users): Observable<Responses<Users>> {
    return this.http.post<Responses<Users>>(`${API.WEDEMY_HOST_DOMAIN}/user`, participant)
  }

  login(user: Users): Observable<any> {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}/api/login`,
      {
        username: user.username,
        userPassword: user.userPassword
      }
    )
  }

  resetPassword(profile: Profiles): Observable<Responses<Profiles>> {
    return this.http.patch<Responses<Profiles>>(`${API.WEDEMY_HOST_DOMAIN}/user/forget-password`, profile)
  }

  getUserById(userId: string): Observable<Response<Users>> {
    return this.http.get<Response<Users>>(`${API.WEDEMY_HOST_DOMAIN}/user/${userId}`)
  }

  getUserByRoleCode(roleCode: string): Observable<Response<Users[]>> {
    return this.http.get<Response<Users[]>>(`${API.WEDEMY_HOST_DOMAIN}/user/role/${roleCode}`)
  }
}
