import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Forums } from "./forums";
import { Users } from "./users";

export class DetailForums extends BaseMaster {
    public dtlForumDateTime: Date;

    public contentText: string;

    public idUser: Users;

    public idForum: Forums;
}