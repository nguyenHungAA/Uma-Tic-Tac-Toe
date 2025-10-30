export interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface loginPayload {
    email?: string,
    password?: string,
    idToken?: string,
    firebaseUid?: string,
    firebaseEmail?: string | null,
}

export interface FindUserByEmailPayload {
    email: string;
    firebaseUid?: string;
    avatarUrl?: string | null;
}
