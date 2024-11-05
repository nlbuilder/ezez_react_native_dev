export interface initServiceInfo {
    businessId: string;
    chosenOption: string;
    businessBranchName: string;
    businessBranchCode: string;
}

export interface BusinessInfo {
    businessId: string;
    name?: string;
    businessBranchInfos?: businessBranchInfo[];
    // addressLine1?: string;
    // addressLine2?: string;
    // city?: string;
    // state?: string;
    // zip?: string;
    // country?: string;
    // phoneNumber?: string;
    email: string;
    // logoURL?: string;
    // description?: string;
    // managerName?: string[];
    // capacity?: number;
    role?: string;
    listOfStaff?: BusinessStaffInfoBrief[];
}

export interface businessBranchInfo {
    businessBranchName: string;
    businessBranchCode: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phoneNumber?: string;
    email?: string;
    logoURL?: string;
    description?: string;
    managerName?: string[];
    capacity?: number;
}

export interface BusinessStaffInfoBrief {
    businessBranchName: string;
    businessBranchCode: string;
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
    businessBranchName: string;
    businessBranchCode: string;
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
    photoUrl?: string;
    role: string;
}

export interface ServiceInfo {
    businessId: string;
    businessBranchName: string;
    businessBranchCode: string;
    serviceId: string;
    serviceName: string;
    photoURL?: string;
    price: number;
    notes?: string;
}

export interface BusinessHourInfo {
    businessId: string;
    businessBranchName: string;
    businessBranchCode: string;
    startTime: string;
    finishTime: string;
}
