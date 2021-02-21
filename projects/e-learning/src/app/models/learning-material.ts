import { BaseMaster } from "@bootcamp-core/models/base-master";
import { LearningMaterialType } from "./learning-material-type";

export class LearningMaterial extends BaseMaster {
  code?: string;
  learningMaterialName?: string;
  idLearningMaterialType?: LearningMaterialType;
  description?: string;
  file?: any;
  fileType?: string;
}