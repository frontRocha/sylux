import { User } from "firebase/auth";

import { AuthContextService } from "../../Services/AuthContextService/AuthContextService";

export class AuthContextController {
    public async handleDataGoogleAuth(): Promise<User | void> {
        const result = await new AuthContextService().runAuth()

        return result
    }
}