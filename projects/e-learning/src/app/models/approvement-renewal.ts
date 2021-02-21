import { BaseTransaction } from "@bootcamp-core/models/base-transaction";
import { Approvement } from "./approvement";
import { Presence } from "./presence";

export class ApprovementRenewal extends BaseTransaction {
  idPresence?: Presence;
  idApprovement?: Approvement;
}