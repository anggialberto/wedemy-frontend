import { ROLE } from "@bootcamp-homepage/constants/roles";

export class Permissions {
    canActivate(userToken: string, userRole: string, route: string): boolean {
        if(userToken==null) {
            if (route=="auth") {
                return true;
            } else {
                return false;
            }

        } else {
            if (route=="admin") {
                if (userRole == ROLE.ADMIN) {
                    return true;
                } else if (userRole == ROLE.SPRADMIN) {
                    return true;
                } else {
                    return false;
                }

            } else if (route=="participant") {
                if (userRole == ROLE.PARTICIPANT) {
                    return true;
                } else {
                    return false;
                }

            } else if (route=="instructor") {
                if (userRole == ROLE.TUTOR) {
                    return true;
                } else {
                    return false;
                }

            } else if (route=="auth") {
                return false;

            } else {
                return true;
            }
        }
    }
}