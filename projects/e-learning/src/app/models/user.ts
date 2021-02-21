import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Profile } from "./profile";
import { Role } from "./role";

export class User extends BaseMaster {
  username?: string;
  userPassword?: string;
  idProfile?: Profile = new Profile();
  idRole?: Role;
}