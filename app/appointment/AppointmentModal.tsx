// AppointmentModal.tsx
import React from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import AppointmentDetails from "@/components/appointment/appointmentView/AppointmentDetails";

interface AppointmentModalProps {
    visible: boolean;
    onClose: () => void;
}

const AppointmentModal = ({ visible, onClose }: AppointmentModalProps) => {
    const dummyData = [
        {
            date: "2022-12-31",
            time: "10:00 AM",
            numberOfCustomers: 10,
            serviceTitle: "Service123456",
            customerPhoneNumber: "1234567890",
            note: "",
        },
        {
            date: "2022-12-31",
            time: "11:00",
            numberOfCustomers: 1,
            serviceTitle: "Service2",
            customerPhoneNumber: "1234567890",
            note: "Note",
        },
        {
            date: "2022-12-31",
            time: "12:00",
            numberOfCustomers: 1,
            serviceTitle: "Service3",
            customerPhoneNumber: "1234567890",
            note: "Note",
        },
        {
            date: "2022-12-31",
            time: "14:00",
            numberOfCustomers: 1,
            serviceTitle: "Service4",
            customerPhoneNumber: "1234567890",
            note: "Note",
        },
    ];

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={dummyData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <AppointmentDetails
                                time={item.time}
                                note={item.note}
                                serviceTitle={item.serviceTitle}
                                numberOfCustomers={item.numberOfCustomers}
                                customerPhoneNumber={item.customerPhoneNumber}
                            />
                        )}
                    />
                    <Text style={styles.closeText} onPress={onClose}>
                        Close
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default AppointmentModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        width: "90%",
        height: "70%",
    },
    closeText: {
        marginTop: 20,
        color: "blue",
        textAlign: "center",
    },
});
