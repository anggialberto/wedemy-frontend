import { Profiles } from "@bootcamp-homepage/models/profiles";
import { Roles } from "@bootcamp-homepage/models/roles";
import { BaseMaster } from "@bootcamp-core/models/base-master";

export class Users extends BaseMaster {

    username?: string;
    userPassword?: string;
    idProfile: Profiles = new Profiles();
    idRole: Roles = new Roles();

}