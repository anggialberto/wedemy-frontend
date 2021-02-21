import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { Forum } from '@bootcamp-elearning/models/forum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  getForum(idDetailModuleRegistration: string): Observable<any> {
    return this.http.get<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_FORUM_MATERIAL_QUERY_PATH}/${idDetailModuleRegistration}`)
  }

  postForum(data: Forum): Observable<any[]> {
    return this.http.post<any[]>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_FORUM_QUERY_PATH}`, data)
  }

  replyPostForum(data: any): Observable<any> {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_FORUM_REPLY_QUERY_PATH}`, data)
  }
}
