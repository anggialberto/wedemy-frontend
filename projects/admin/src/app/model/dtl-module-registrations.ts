import { BaseMaster } from "@bootcamp-core/models/base-master";
import { LearningMaterials } from "./learning-materials";
import { ModuleRegistrations } from "./module-registrations";

export class DetailModuleRegistrations extends BaseMaster {
    public idModuleRegistration: ModuleRegistrations = new ModuleRegistrations();

    public idLearningMaterial: LearningMaterials = new LearningMaterials();

    public orderNumber: number;

    public scheduleDate: Date;
}