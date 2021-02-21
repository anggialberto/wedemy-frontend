import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { SubmissionStatus } from '../model/submission-status';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionStatusService {

  constructor(private http: HttpClient) {
  }

  getSubmissionStatus(): Observable<Responses<SubmissionStatus[]>> {
    return this.http.get<Responses<SubmissionStatus[]>>(`${API.WEDEMY_HOST_DOMAIN}/submission-status`)
  }

  insertSubmissionStatus(submissionStatus: SubmissionStatus): Observable<Responses<SubmissionStatus>> {
    return this.http.post<Responses<SubmissionStatus>>(`${API.WEDEMY_HOST_DOMAIN}/submission-status`, submissionStatus)
  }

  updateSubmissionStatus(submissionStatus: SubmissionStatus): Observable<Responses<SubmissionStatus>> {
    return this.http.put<Responses<SubmissionStatus>>(`${API.WEDEMY_HOST_DOMAIN}/submission-status`, submissionStatus)
  }

  deleteById(id: string, idUser: string): Observable<Responses<SubmissionStatus>> {
    return this.http.delete<Responses<SubmissionStatus>>(`${API.WEDEMY_HOST_DOMAIN}/submission-status?id=${id}&idUser=${idUser}`)
  }
}
