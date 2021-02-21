import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Profile } from '@bootcamp-elearning/models/profile';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { AuthService } from '@bootcamp-homepage/services/auth.service';
import { BaseService } from '@bootcamp-homepage/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService {

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  updateProfile(formData: FormData): Observable<any> {
    return this.http.put<any>(`${API.WEDEMY_HOST_DOMAIN}/profile`, formData)
  }
}
