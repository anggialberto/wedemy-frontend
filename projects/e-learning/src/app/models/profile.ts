import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Files } from "./files";

export class Profile extends BaseMaster {
  fullName?: string;
  idNumber?: string;
  birthPlace?: string;
  birthDate?: string; // pattern = yyyy-MM-dd
  phone?: string;
  address?: string;
  email?: string;
  idFile: Files = new Files();
  bio?: string;
}