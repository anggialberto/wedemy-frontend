import { BaseEntity } from "./base-entity";

export abstract class BaseTransaction extends BaseEntity {
    trxNumber?: string;
    trxDate?: Date;
}