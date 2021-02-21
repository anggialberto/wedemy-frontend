import { BaseEntity } from "./base-entity";

export class BaseMaster extends BaseEntity {

    isActive?: boolean;
    updatedBy?: string;
    updatedAt?: Date;

}