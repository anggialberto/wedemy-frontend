import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Files } from "./files";

export class Profiles extends BaseMaster {

    fullName?: string;
    idNumber?: string;
    birthPlace?: string;
    birthDate?: Date;
    phone?: string;
    address?: string;
    email?: string;
    idFile: Files = new Files();
    
}