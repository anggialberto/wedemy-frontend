import { DetailClasses } from "./detail-classes";
import { ModuleRegistrations } from "./module-registrations";

export class DetailClassInformation {

    detailClass: DetailClasses = new DetailClasses();
    modules?: ModuleRegistrations[];
    totalHours?: number;
    totalParticipant?: number;
}