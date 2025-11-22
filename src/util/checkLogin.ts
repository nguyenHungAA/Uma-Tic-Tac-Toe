import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase"

export function checkLogin(authParams: typeof auth): Promise<boolean> {
    return new Promise((resolve) => {
        onAuthStateChanged(authParams, (user) => {
            resolve(!!user);
        });
    });
}