import { Auth, AuthProvider, getAuth, GoogleAuthProvider, OAuthCredential, signInWithPopup, User } from "firebase/auth";
import { app } from "../../Mocks/FirebaseConfig";
import { handleBusinessError } from "../../Utils/HandleBusinessError/HandleBusinessError";

const providerGoogle: AuthProvider = new GoogleAuthProvider()

export class AuthContextService {
    public runAuth = async (): Promise<User | void> => {
        const auth: Auth = getAuth(app)

        await signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
                const token: string | undefined = credential?.accessToken;
                const user: object = result.user;

                if (token) {
                    localStorage.setItem("@AuthFirebase:token", token);
                    localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
                }

                return user
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    handleBusinessError(err)
                }

                return err
            })
    }
}