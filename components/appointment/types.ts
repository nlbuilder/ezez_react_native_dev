import { SharedValue } from "react-native-reanimated";

export interface AppointmentCardProps {
    index: number;
    scrollY: SharedValue<number>;
    activeCardIndex: SharedValue<number | null>;
}

export interface AppointmentCardBodyProps {
    serviceTitle: string;
    numberOfCustomers: number;
}

export interface AppointmentDetailsProps {
    time: string;
    serviceTitle: string;
    numberOfCustomers: number;
    customerPhoneNumber: string;
    note: string;
}
