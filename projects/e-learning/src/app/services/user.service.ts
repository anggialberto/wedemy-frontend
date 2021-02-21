import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@bootcamp-elearning/models/user';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { BaseService } from '@bootcamp-homepage/services/base.service';
import { Observable } from 'rxjs';
import API from '@bootcamp-core/constants/api';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  insertUser(participant: User): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${API.WEDEMY_HOST_DOMAIN}/user`, participant)
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}/api/login`,
      {
        username: user.username,
        userPassword: user.userPassword
      }
    )
  }


  getUserById(userId: string): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${API.WEDEMY_HOST_DOMAIN}/user/${userId}`)
  }

  updateUser(user: User): Observable<Response<User>> {
    return this.http.patch<Response<User>>(`${API.WEDEMY_HOST_DOMAIN}/user`, user);
  }
  
}
