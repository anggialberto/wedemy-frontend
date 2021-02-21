import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Class } from "./class";

export class DetailClass extends BaseMaster {
  idClass?: Class;
  code?: string;
  startDate?: string; // pattern: yyyy-MM-dd
  endDate?: string; // pattern: yyyy-MM-dd
  startTime?: string; // pattern: HH:mm
  endTime?: string; // patteran: HH:mm
  totalParticipant?: number;
}