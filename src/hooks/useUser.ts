import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/axios";
import type { User } from "@/types/User";

export function useRegisterUser() {
    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: (payload: User) => registerUser(payload),
    });
}
