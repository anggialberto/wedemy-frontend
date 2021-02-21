import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssigment(param: any): Observable<any> {
    return this.http.get<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_ASSIGNMENT_SCORE_QUERY_PATH}`, { params: param });
  }

  setScoreAssignment(newAssignmentScore: any[], updateAssignmentScore: any[]): Observable<any> {
    let assignmentRequest: any[] = [];
    console.log(assignmentRequest);

    if (newAssignmentScore.length > 0) {
      let data = { evaluations: [...newAssignmentScore] }
      assignmentRequest.push(this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_ASSIGNMENT_QUERY_PATH}`, data))
    }
    if (updateAssignmentScore.length > 0) {
      let data = { evaluations: [...updateAssignmentScore] }
      assignmentRequest.push(this.http.put<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_ASSIGNMENT_QUERY_PATH}`, data))
    }
    console.log('Assignment Request');
    return forkJoin([...assignmentRequest]);
  }
}
