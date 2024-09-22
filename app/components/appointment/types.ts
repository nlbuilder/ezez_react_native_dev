import { SharedValue } from "react-native-reanimated";

export interface AppointmentCardProps {
    index: number;
    scrollY: SharedValue<number>;
}

export interface AppointmentCardBodyProps {
    serviceTitle: string;
    numberOfCustomers: number;
}

export interface AppointmentDetailsProps {
    id: string;
    date: string;
    time: string;
    serviceTitle: string;
    numberOfCustomers: number;
    customerPhoneNumber: string;
    note: string;
}

export interface DateTimePickerProps {
    selectedDate: Date;
}

export interface ModalProps {
    visible: boolean;
    onClose: () => void;
}
