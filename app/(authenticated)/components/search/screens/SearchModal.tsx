import React, { useEffect, useState } from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    useColorScheme,
} from "react-native";
import { View, Text } from "@/constants/styles/Themed";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/styles/Colors";
import { TextInput } from "react-native-gesture-handler";
import { ModalProps } from "../types/types";
import { useGetAllAppointmentsAPI } from "../../appointment/apis/getAllAppointmentsInfoAPI";
import { AppointmentDetailsProps } from "../../appointment/types/types";
import { useNavigation } from "expo-router";

// Custom hook for debouncing
function useDebouncedValue<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

const SearchModal = ({ visible, onClose }: ModalProps) => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const {
        allAppointmentInfo,
        isLoading: isGetAllAppointmentsInfoLoading,
        refetch: refetchAllAppointmentsInfo,
    } = useGetAllAppointmentsAPI();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredAppointment, setFilteredAppointment] = useState<
        AppointmentDetailsProps[]
    >([]);
    const [isAppointmentFound, setIsAppointmentFound] =
        useState<boolean>(false);

    const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

    const [isUpcoming, setIsUpcoming] = useState(true);

    // Effect to handle search based on debounced input and toggle state
    useEffect(() => {
        handleSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, isUpcoming]);

    const handleSearch = (query: string) => {
        if (!query.trim()) {
            setFilteredAppointment([]);
            setIsAppointmentFound(false);
            return;
        }

        const todayString = new Date().toDateString();
        let filteredData: AppointmentDetailsProps[] = [];

        if (isUpcoming) {
            const filteredDataByDate = Array.isArray(allAppointmentInfo)
                ? allAppointmentInfo.filter((appointment) => {
                      const appointmentDate = appointment.dateString as string;
                      return appointmentDate >= todayString;
                  })
                : [];
            filteredData = filteredDataByDate.filter((appointment) => {
                const phoneNumber = appointment.customerPhoneNumber as string;
                return phoneNumber.includes(query);
            });
        } else {
            const filteredDataByDate = Array.isArray(allAppointmentInfo)
                ? allAppointmentInfo.filter((appointment) => {
                      const appointmentDate = appointment.dateString as string;
                      return appointmentDate < todayString;
                  })
                : [];
            filteredData = filteredDataByDate.filter((appointment) => {
                const phoneNumber = appointment.customerPhoneNumber as string;
                return phoneNumber.includes(query);
            });
        }

        setFilteredAppointment(filteredData);
        setIsAppointmentFound(filteredData.length > 0);
    };

    const renderAppointmentItem = ({
        item,
    }: {
        item: AppointmentDetailsProps;
    }) => (
        <View style={styles.card}>
            <Text style={styles.detailsAppointmentInfo}>
                📅 Date: {item.dateString}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                ⏰ Time: {item.roundedTime.toString()}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                Service: {item.serviceName}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                Customers: {item.numberOfCustomers} people
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                Name: {item.customerName}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                📞 Phone: {item.customerPhoneNumber}
            </Text>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView
                        style={[
                            styles.modalContainer,
                            {
                                backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                            },
                        ]}
                    >
                        {/* Header */}
                        <View style={{ marginVertical: hp("1.5%") }}>
                            <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                Search Appointment
                            </Text>
                        </View>

                        {/* Search bar */}
                        <View style={styles.searchBar}>
                            <Pressable
                                onPress={() => {
                                    onClose();
                                    setSearchQuery("");
                                    setIsUpcoming(true);
                                }}
                            >
                                <AntDesign
                                    name="left"
                                    size={28}
                                    color={Colors[colorScheme ?? "light"].tint}
                                    style={{ marginRight: wp("1.5%") }}
                                />
                            </Pressable>
                            <TextInput
                                placeholder="Search by phone number..."
                                style={styles.input}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* Toggle Between Past and Upcoming */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                                backgroundColor: Colors.light.tabIconDefault,
                                width: wp("48%"),
                                height: hp("4%"),
                                alignSelf: "flex-end",
                                marginHorizontal: wp("10%"),
                            }}
                        >
                            <Pressable
                                onPress={() => setIsUpcoming(false)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: hp("1%"),
                                    backgroundColor: !isUpcoming
                                        ? Colors.light.tint
                                        : "transparent",
                                    borderRadius: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        color: !isUpcoming
                                            ? Colors.light.background
                                            : Colors.light.text,
                                        fontWeight: !isUpcoming
                                            ? "bold"
                                            : "normal",
                                    }}
                                >
                                    Past
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setIsUpcoming(true)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: hp("1%"),
                                    backgroundColor: isUpcoming
                                        ? Colors.light.tint
                                        : "transparent",
                                    borderRadius: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        color: isUpcoming
                                            ? Colors.light.background
                                            : Colors.light.text,
                                        fontWeight: isUpcoming
                                            ? "bold"
                                            : "normal",
                                    }}
                                >
                                    Upcoming
                                </Text>
                            </Pressable>
                        </View>

                        {/* Appointment Details */}
                        {isAppointmentFound && (
                            <FlatList
                                data={filteredAppointment}
                                renderItem={renderAppointmentItem}
                                keyExtractor={(item) => item.appointmentId}
                                contentContainerStyle={styles.listContainer}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default SearchModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "center",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: wp("80%"),
        height: hp("5%"),
        marginBottom: hp("2.5%"),
        right: wp("2.5%"),
    },
    input: {
        width: "100%",
        height: "100%",
        borderColor: Colors.light.tint,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: wp("5%"),
    },
    listContainer: {
        paddingHorizontal: wp("10%"),
        paddingVertical: hp("2%"),
    },
    card: {
        // backgroundColor: "#fff",
        backgroundColor: "rgba(234,230,222,.8)",
        width: wp("60%"),
        padding: 20,
        marginVertical: hp("1.5%"),
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailsAppointmentInfo: {
        paddingVertical: 5,
    },
});
