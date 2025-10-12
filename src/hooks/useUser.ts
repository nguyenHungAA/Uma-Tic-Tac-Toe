import { useMutation } from "@tanstack/react-query";
import { login, registerUser } from "@/api/axios";
import type { User } from "@/types/User";

export function useRegisterUser() {
    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: (payload: User) => registerUser(payload),
    });
}

interface LoginPayload {
    email?: string | undefined;
    password?: string | undefined;
    idToken?: string | undefined;
    firebaseUid?: string | undefined;
    firebaseEmail?: string | undefined;
}

export function useLoginUser() {
    return useMutation({
        mutationKey: ['loginUser'],
        mutationFn: (data: LoginPayload) => login(data),
    });
}
