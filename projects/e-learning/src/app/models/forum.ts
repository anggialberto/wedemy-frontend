import { BaseTransaction } from "@bootcamp-core/models/base-transaction";
import { DetailModuleRegistration } from "./detail-module-registration";
import { User } from "./user";

export class Forum extends BaseTransaction {
  forumDateTime?: string; // pattern: yyyy-MM-dd HH:mm:ss
  contentText?: string;
  idUser?: User;
  idDetailModuleRegistration?: DetailModuleRegistration;
}