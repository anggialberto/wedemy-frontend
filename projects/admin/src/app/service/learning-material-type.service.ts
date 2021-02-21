import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { LearningMaterialTypes } from '../model/learning-material-types';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LearningMaterialTypeService {

  constructor(private http: HttpClient) {
  }

  getLearningMaterialTypes(): Observable<Responses<LearningMaterialTypes[]>> {
    return this.http.get<Responses<LearningMaterialTypes[]>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material-type`)
  }

  insertLearningMaterialTypes(learningMaterialType: LearningMaterialTypes): Observable<Responses<LearningMaterialTypes>> {
    return this.http.post<Responses<LearningMaterialTypes>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material-type`, learningMaterialType)
  }

  updateLearningMaterialType(learningMaterialType: LearningMaterialTypes): Observable<Responses<LearningMaterialTypes>> {
    return this.http.put<Responses<LearningMaterialTypes>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material-type`, learningMaterialType)
  }

  deleteById(id: string, idUser: string): Observable<Responses<LearningMaterialTypes>> {
    return this.http.delete<Responses<LearningMaterialTypes>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material-type?id=${id}&idUser=${idUser}`)
  }
}
