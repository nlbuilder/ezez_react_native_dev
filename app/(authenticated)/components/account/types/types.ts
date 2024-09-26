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
    managerName?: string;
    listOfStaff?: BusinessStaffInfo[];
}

export interface BusinessStaffInfo {
    businessStaffId?: string;
    businessId: string;
    name?: string;
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
