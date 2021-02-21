import { MessageStat } from "@bootcamp-admin/consts/message-stat";

export class Responses<T>{
    status: string;
    data: T;
    ok: boolean;
    // message: MessageStat;
}