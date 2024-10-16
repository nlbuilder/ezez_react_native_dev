import { SharedValue } from "react-native-reanimated";

interface ServiceSummary {
    service: string;
    customers: number;
}
export interface AppointmentCardProps {
    index: number;
    scrollY: SharedValue<number>;
    time: string;
    sumOfCustomerByRoundedTime: number;
    listOfCustomerSumByService: ServiceSummary[];
}

export interface AppointmentCardBodyProps {
    serviceTitle: string;
    numberOfCustomers: number;
}

export interface AppointmentDetailsProps {
    appointmentId: string;
    businessId: string;
    customerId: string;
    serviceId: string;
    date: string;
    time: string;
    roundedTime: string;
    serviceName: string;
    numberOfCustomers: number;
    customerPhoneNumber: string;
    customerName: string;
    note: string;
    status: string;
}

export interface DateTimePickerProps {
    selectedDate: Date;
}

export interface ModalProps {
    visible: boolean;
    onClose: () => void;
}
