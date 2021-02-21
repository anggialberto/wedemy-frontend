import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from '@bootcamp-core/constants/api';
import { LearningMaterialType } from '@bootcamp-elearning/models/learning-material-type';
import { Response } from '@bootcamp-elearning/models/responses/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getMaterial(idDetailModuleRegistration: string): Observable<any> {
    return this.http.get<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_DETAIL_MODULE_QUERY_PATH}/${idDetailModuleRegistration}`)
  }

  getMaterialTypes(): Observable<Response<LearningMaterialType[]>> {
    return this.http.get<Response<LearningMaterialType[]>>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_MATERIAL_TYPE_QUERY_PATH}`)
  }

  saveMaterial(data: any): Observable<any> {
    return this.http.post<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_MATERIAL_QUERY_PATH}`, data);
  }

  removeMaterial(id: string, idUser: string): Observable<Response<any[]>> {
    let param = { id, idUser }
    return this.http.delete<Response<any[]>>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_MATERIAL_QUERY_PATH}`, { params: param });
  }

  updateMaterial(data: any): Observable<any> {
    return this.http.put<any>(`${API.WEDEMY_HOST_DOMAIN}${API.WEDEMY_MATERIAL_QUERY_PATH}`, data);
  }
}
