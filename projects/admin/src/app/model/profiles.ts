import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Files } from "./files";

export class Profiles extends BaseMaster {
    public fullName?: string;

    public idNumber?: string;

    public birthPlace?: string;

    public birthDate?: string;

    public phone?: string;

    public address?: string;

    public email?: string;

    public idFile?: Files;

    public bio?: string;
}