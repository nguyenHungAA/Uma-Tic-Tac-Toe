import { useMutation } from "@tanstack/react-query";

import type { FindUserByEmailPayload, loginPayload } from "@/api/auth/type";
import type { User } from "@/types/User";

import { registerUser, login, findUserByEmail } from "@/api/auth";
import { enterGame, winGame } from "@/api/game";

export function useRegisterUser() {
    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: (payload: User) => registerUser(payload),
    });
}

export function useLoginUser() {
    return useMutation({
        mutationKey: ['loginUser'],
        mutationFn: (data: loginPayload) => login(data),
    });
}


export function useFindUserByEmail() {
    return useMutation({
        mutationKey: ['findUserByEmail'],
        mutationFn: (data: FindUserByEmailPayload) => findUserByEmail(data),
    });
}

export function useEnterGame() {
    return useMutation({
        mutationKey: ['enterGame'],
        mutationFn: (userId: string) => enterGame({ userId }),
    });
}

export function useWinGame() {
    return useMutation({
        mutationKey: ['winGame'],
        mutationFn: (userId: string) => winGame({ userId }),
    });
}   