import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { AssignmentSubmissions } from '../model/assignment-submissions';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {

  constructor(private http: HttpClient) {
  }

  getAssignmentSubmissions(): Observable<Responses<AssignmentSubmissions[]>> {
    return this.http.get<Responses<AssignmentSubmissions[]>>(`${API.WEDEMY_HOST_DOMAIN}/assignment-submission/all`)
  }

  deleteById(id: string, idUser: string): Observable<Responses<AssignmentSubmissions>> {
    return this.http.delete<Responses<AssignmentSubmissions>>(`${API.WEDEMY_HOST_DOMAIN}/assignment-submission?id=${id}&idUser=${idUser}`)
  }
}
