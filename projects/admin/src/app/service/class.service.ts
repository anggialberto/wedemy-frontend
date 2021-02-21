import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { Classes } from '../model/classes';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {
  }

  getClasses(): Observable<Responses<Classes[]>> {
    return this.http.get<Responses<Classes[]>>(`${API.WEDEMY_HOST_DOMAIN}/class`)
  }

  insertClasses(formData: FormData): Observable<any> {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}/class`, formData)
  }

  deleteById(id: string, idUser: string): Observable<Responses<Classes>> {
    return this.http.delete<Responses<Classes>>(`${API.WEDEMY_HOST_DOMAIN}/class?id=${id}&idUser=${idUser}`)
  }

  updateClass(formData: FormData): Observable<any> {
    return this.http.put<any>(`${API.WEDEMY_HOST_DOMAIN}/class`, formData)
  }

  getClassById(id: string): Observable<Responses<Classes>> {
    return this.http.get<Responses<Classes>>(`${API.WEDEMY_HOST_DOMAIN}/class/${id}`)
  }

  getClassInactive(): Observable<Responses<Classes[]>> {
    return this.http.get<Responses<Classes[]>>(`${API.WEDEMY_HOST_DOMAIN}/class/inactive`)
  }


}
