import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Profiles } from "./profiles";
import { Roles } from "./roles";

export class Users extends BaseMaster {

    public username: string;

    public userPassword: string;

    public idProfile: Profiles = new Profiles();

    public idRole: Roles = new Roles();
}