import { BaseMaster } from "@bootcamp-core/models/base-master";
import { User } from "./user";

export class Class extends BaseMaster {
  code?: string;
  className?: string;
  description?: string;
  thumbnailImg?: string;
  quota?: number;
  idTutor?: User;
}