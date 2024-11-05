// define a type for the user object
export interface User {
    IdToken?: string;
    uid: string;
    displayName: string;
    photoURL: string;
    providerId: string;
    createdAt: string;
    lastLoginAt: string;
    email: string;
}

// define a type for the auth context object
export interface ContextInterface {
    user: User | null;
    signIn: React.Dispatch<React.SetStateAction<User>>;
    signOut: () => void;
}
