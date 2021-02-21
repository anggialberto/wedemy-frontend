import { BaseTransaction } from "@bootcamp-core/models/base-transaction";
import { DetailModuleRegistration } from "./detail-module-registration";
import { User } from "./user";

export class Presence extends BaseTransaction {
  idDetailModuleRegistration?: DetailModuleRegistration;
  presenceTime?: string; // pattern: HH:mm
  idUser?: User;
}