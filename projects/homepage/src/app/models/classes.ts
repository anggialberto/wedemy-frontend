import { Byte } from "@angular/compiler/src/util";
import { Users } from "@bootcamp-homepage/models/users";
import { BaseMaster } from "@bootcamp-core/models/base-master";
import { Files } from "./files";

export class Classes extends BaseMaster {

    code: string;
    className: string;
    description: string;
    thumbnailImg: string;
    idFile: Files = new Files();
    quota: number;
    idTutor: Users = new Users();

}