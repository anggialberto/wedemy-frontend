import { BaseTransaction } from "@bootcamp-core/models/base-transaction";
import { LearningMaterial } from "./learning-material";
import { ModuleRegistration } from "./module-registration";

export class DetailModuleRegistration extends BaseTransaction {
  idModuleRegistration?: ModuleRegistration;
  idLearningMaterial?: LearningMaterial;
  orderNumber?: number;
  scheduleDate?: string; // pattern: yyyy-MM-dd
}