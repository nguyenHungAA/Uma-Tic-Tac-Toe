import { useMutation } from "@tanstack/react-query";
import { login, registerUser } from "@/api/axios";
import type { User } from "@/types/User";

export function useRegisterUser() {
    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: (payload: User) => registerUser(payload),
    });
}

export function useLoginUser() {
    return useMutation({
        mutationKey: ['loginUser'],
        mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    });
}
