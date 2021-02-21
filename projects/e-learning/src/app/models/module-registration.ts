import { BaseTransaction } from "@bootcamp-core/models/base-transaction";
import { DetailClass } from "./detail-class";
import { Module } from "./module";

export class ModuleRegistration extends BaseTransaction {
  idDetailClass?: DetailClass;
  idModule?: Module;
}