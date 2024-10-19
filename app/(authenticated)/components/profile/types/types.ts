// export interface User {
//     IdToken?: string;
//     uid: string;
//     displayName: string;
//     photoURL: string;
//     providerId: string;
//     createdAt: string;
//     lastLoginAt: string;
//     email: string;
// }

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
    listOfStaff?: BusinessStaffInfoBrief[];
}

export interface BusinessStaffInfoBrief {
    businessStaffId: string;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    photoURL?: string;
    role: string;
}

export interface BusinessStaffInfoDetails {
    businessStaffId?: string;
    businessId: string;
    firstName?: string;
    lastName?: string;
    DOB?: Date;
    Sex?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phoneNumber: string;
    email: string;
    role: string;
    photoUrl?: string;
}

export interface ServiceInfo {
    businessId: string;
    serviceId: string;
    serviceName: string;
    photoURL?: string;
    price: number;
    notes?: string;
}

export interface BusinessHourInfo {
    businessId: string;
    startTime: string;
    finishTime: string;
}
