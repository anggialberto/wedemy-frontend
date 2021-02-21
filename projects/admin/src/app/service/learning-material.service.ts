import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responses } from '@bootcamp-admin/model/response';
import API from '@bootcamp-core/constants/api';
import { Observable } from 'rxjs';
import { LearningMaterials } from '../model/learning-materials';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LearningMaterialService {

  constructor(private http: HttpClient) {
  }

  getLearningMaterials(): Observable<Responses<LearningMaterials[]>> {
    return this.http.get<Responses<LearningMaterials[]>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material`)
  }

  insertLearningMaterials(learningMaterial: LearningMaterials): Observable<Responses<LearningMaterials>> {
    return this.http.post<Responses<LearningMaterials>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material`, learningMaterial)
  }

  updateLearningMaterial(learningMaterial: LearningMaterials): Observable<Responses<LearningMaterials>> {
    return this.http.put<Responses<LearningMaterials>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material`, learningMaterial)
  }

  deleteById(id: string, idUser: string): Observable<Responses<LearningMaterials>> {
    return this.http.delete<Responses<LearningMaterials>>(`${API.WEDEMY_HOST_DOMAIN}/learning-material?id=${id}&idUser=${idUser}`)
  }
}
