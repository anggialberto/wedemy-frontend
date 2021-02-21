import { Classes } from "./classes";

export class DetailClasses {

    id: string; 
    idClass: Classes = new Classes();
    code: string;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;

    status?: number;
    totalModules?: number;
    totalHours?: number;
    totalParticipant?: number;

}