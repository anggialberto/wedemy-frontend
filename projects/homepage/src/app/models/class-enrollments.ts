import { BaseTransaction } from "@bootcamp-core/models/base-transaction";
import { DetailClasses } from "./detail-classes";
import { Users } from "./users";

export class ClassEnrollments extends BaseTransaction {

    idDetailClass: DetailClasses = new DetailClasses();
    idUser: Users = new Users();
    isOngoing?: boolean;
    
}