import { BaseMaster } from "@bootcamp-core/models/base-master";
import { AssignmentTypes } from "./assignment-types";
import { DetailModuleRegistrations } from "./dtl-module-registrations";

export class Assignments extends BaseMaster {
    public code: string;

    // public byte[] file;

    public fileType: string;

    public idDetailModuleRegistration: DetailModuleRegistrations = new DetailModuleRegistrations();

    public idAssignmentType: AssignmentTypes = new AssignmentTypes();
}