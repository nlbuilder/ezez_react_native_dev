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

export interface ContextInterface {
    user: User | null;
    signIn: React.Dispatch<React.SetStateAction<User>>;
    signOut: () => void;
}

export interface BusinessInfo {
    businessId: string;
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phoneNumber?: string;
    email: string;
    logoURL?: string;
    description?: string;
    managerName?: string[];
    listOfStaff?: BusinessStaffInfo[];
}

export interface BusinessStaffInfo {
    businessStaffId?: string;
    // businessId: string;
    firstName?: string;
    lastName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phoneNumber: string;
    email: string;
    role: string;
}
