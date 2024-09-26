export interface User {
    uid: string;
    displayName: string;
    photoURL: string;
    providerId: string;
    createdAt: string;
    lastLoginAt: string;
    email: string;
}

export interface ContextInterface {
    user: User | null;
    signIn: React.Dispatch<React.SetStateAction<User>>;
    signOut: () => void;
}
