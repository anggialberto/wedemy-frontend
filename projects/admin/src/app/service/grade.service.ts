import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grades } from '../model/grades';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private http: HttpClient) {
  }

  getGrades(): Observable<Responses<Grades[]>> {
    return this.http.get<Responses<Grades[]>>(`${API.WEDEMY_HOST_DOMAIN}/grade`)
  }

  insertGrade(grade: Grades): Observable<Responses<Grades>> {
    return this.http.post<Responses<Grades>>(`${API.WEDEMY_HOST_DOMAIN}/grade`, grade)
  }

  deleteById(id: string, idUser: string): Observable<Responses<Grades>> {
    return this.http.delete<Responses<Grades>>(`${API.WEDEMY_HOST_DOMAIN}/grade?id=${id}&idUser=${idUser}`)
  }

  updateGrade(grade: Grades): Observable<Responses<Grades>> {
    return this.http.put<Responses<Grades>>(`${API.WEDEMY_HOST_DOMAIN}/grade/`, grade);
  }

}
