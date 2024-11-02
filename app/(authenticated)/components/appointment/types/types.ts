import { SharedValue } from "react-native-reanimated";

export interface ServiceSummary {
    serviceName: string;
    customers: number;
}

export interface TimeSummary {
    roundedTime: string;
    summary: ServiceSummary[];
}

export interface AppointmentCardProps {
    index: number;
    scrollY: SharedValue<number>;
    time: string;
    sumOfCustomerByTime: number;
    sumOfCustomerByTimeAndService: ServiceSummary[];
    totalCapacity: number;
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
    dateString: string;
    dateDate: Date;
    timeString: string;
    timeDate: Date;
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
