import AuthFirebaseProvider from "../Context/Auth";

import { Index } from "./Routes/Routes";

export default function Router() {
    return (
        <AuthFirebaseProvider>
            <Index />
        </AuthFirebaseProvider>
    )
};