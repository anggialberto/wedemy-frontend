import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Files } from "./files";
import { Users } from "./users";

export class Classes extends BaseMaster {
    code: string;
    className: string;
    description: string;
    thumbnailImg: string;
    idFile: Files = new Files();
    quota: number;
    idTutor: Users = new Users();
}