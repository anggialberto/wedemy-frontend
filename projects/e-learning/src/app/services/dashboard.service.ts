import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { ROLE } from '@bootcamp-core/constants/role';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getMyClass(userId: string, roleCode: string): Observable<Response<any[]>> {
    let PATH_MY_CLASS: string;
    if (ROLE.TUTOR === roleCode) {
      PATH_MY_CLASS = API.WEDEMY_CLASS_ENROLLMENT_TUTOR_QUERY_PATH;
    } else if (ROLE.PARTICIPANT) {
      PATH_MY_CLASS = API.WEDEMY_CLASS_ENROLLMENT_PARTICIPANT_QUERY_PATH;
    }
    return this.http.get<Response<any[]>>(`${API.WEDEMY_HOST_DOMAIN}${PATH_MY_CLASS}/${userId}`);
  }

}


