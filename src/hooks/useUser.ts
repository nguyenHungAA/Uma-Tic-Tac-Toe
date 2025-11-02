import { useMutation } from "@tanstack/react-query";
import { findUserByEmail, login, registerUser } from "@/api/auth";
import { enterGame, winGame } from "@/api/game";
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

interface FindUserByEmailPayload {
    email: string;
    firebaseUid?: string;
    avatarUrl?: string | null;
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