import { Time } from "@angular/common";
import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Classes } from "./classes";

export class DetailClasses extends BaseMaster {
    public idClass: Classes = new Classes();

    public code: string;

    public startDate: string;

    public endDate: string;

    public startTime: string;

    public endTime: string;

}