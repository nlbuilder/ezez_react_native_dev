// import React, { useEffect, useState } from "react";
// import {
//     FlatList,
//     Modal,
//     Pressable,
//     SafeAreaView,
//     StyleSheet,
//     useColorScheme,
// } from "react-native";
// import { View, Text } from "@/constants/styles/Themed";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { AntDesign } from "@expo/vector-icons";
// import Colors from "@/constants/styles/Colors";
// import { TextInput } from "react-native-gesture-handler";
// import { ModalProps } from "../types/types";
// import { useGetAllAppointmentsAPI } from "../../appointment/apis/getAllAppointmentsInfoAPI";
// import { AppointmentDetailsProps } from "../../appointment/types/types";
// import { useNavigation } from "expo-router";

// // Custom hook for debouncing
// function useDebouncedValue<T>(value: T, delay: number) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => setDebouncedValue(value), delay);

//         return () => clearTimeout(handler); // Cleanup timeout on unmount or when value changes
//     }, [value, delay]);

//     return debouncedValue;
// }

// const SearchModal = ({ visible, onClose }: ModalProps) => {
//     const navigation = useNavigation();
//     const colorScheme = useColorScheme();

//     const {
//         allAppointmentInfo,
//         isLoading: isGetAllAppointmentsInfoLoading,
//         refetch: refetchAllAppointmentsInfo,
//     } = useGetAllAppointmentsAPI();

//     const [searchQuery, setSearchQuery] = useState<string>("");
//     const [filteredAppointment, setFilteredAppointment] = useState<
//         AppointmentDetailsProps[]
//     >([]);
//     const [isAppointmentFound, setIsAppointmentFound] =
//         useState<boolean>(false);

//     const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

//     // Effect to handle search based on debounced input
//     useEffect(() => {
//         handleSearch(debouncedSearchQuery);
//     }, [debouncedSearchQuery]);

//     const handleSearch = (query: string) => {
//         if (!query.trim()) {
//             // Reset results if query is empty
//             setFilteredAppointment([]);
//             setIsAppointmentFound(false);
//             return;
//         }

//         const filteredData = Array.isArray(allAppointmentInfo)
//             ? allAppointmentInfo.filter((appointment) =>
//                   appointment.customerPhoneNumber.includes(query)
//               )
//             : [];

//         setFilteredAppointment(filteredData);

//         console.log(filteredData);
//         setIsAppointmentFound(filteredData.length > 0);
//     };

//     return (
//         <Modal
//             visible={visible}
//             transparent={true}
//             animationType="fade"
//             onRequestClose={onClose}
//         >
//             <SafeAreaView
//                 style={[
//                     styles.modalContainer,
//                     {
//                         backgroundColor:
//                             Colors[colorScheme ?? "light"].background,
//                     },
//                 ]}
//             >
//                 {/* Header */}
//                 <View style={{ marginVertical: hp("1.5%") }}>
//                     <Text style={{ fontSize: 18, fontWeight: "500" }}>
//                         Search Appointment
//                     </Text>
//                 </View>

//                 {/* Search bar */}
//                 <View style={styles.searchBar}>
//                     <Pressable
//                         onPress={() => {
//                             onClose();
//                             setSearchQuery("");
//                         }}
//                     >
//                         <AntDesign
//                             name="left"
//                             size={28}
//                             color={Colors[colorScheme ?? "light"].tint}
//                         />
//                     </Pressable>
//                     <TextInput
//                         placeholder="Search by phone number..."
//                         style={styles.input}
//                         value={searchQuery}
//                         onChangeText={setSearchQuery}
//                         keyboardType="phone-pad"
//                     />
//                     <Pressable onPress={() => handleSearch(searchQuery)}>
//                         <AntDesign
//                             name="rightcircle"
//                             size={28}
//                             color={Colors[colorScheme ?? "light"].tint}
//                             style={{ marginLeft: wp("2%") }}
//                         />
//                     </Pressable>
//                 </View>

//                 {/* Appointment Details */}
//                 {isAppointmentFound && filteredAppointment.length > 0 && (
//                     <View style={styles.detailsContainer}>
//                         <Text style={styles.detailsTitle}>
//                             Appointment Details
//                         </Text>
//                         <Text style={styles.detailsAppointmentInfo}>
//                             📅 Date: {filteredAppointment[0]?.date}
//                         </Text>
//                         <Text style={styles.detailsAppointmentInfo}>
//                             ⏰ Time:{" "}
//                             {filteredAppointment[0]?.roundedTime.toString()}
//                         </Text>
//                         <Text style={styles.detailsAppointmentInfo}>
//                             💼 Service: {filteredAppointment[0]?.serviceName}
//                         </Text>
//                         <Text style={styles.detailsAppointmentInfo}>
//                             👥 Customers:{" "}
//                             {filteredAppointment[0]?.numberOfCustomers} people
//                         </Text>
//                         <Text style={styles.detailsAppointmentInfo}>
//                             🙍‍♂️ Name: {filteredAppointment[0]?.customerName}
//                         </Text>
//                         <Text style={styles.detailsAppointmentInfo}>
//                             📞 Phone:{" "}
//                             {filteredAppointment[0]?.customerPhoneNumber}
//                         </Text>
//                     </View>
//                 )}
//             </SafeAreaView>
//         </Modal>
//     );
// };

// export default SearchModal;

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         alignItems: "center",
//     },
//     searchBar: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         width: wp("72.5%"),
//         height: hp("4.5%"),
//     },
//     input: {
//         width: "100%",
//         height: "100%",
//         borderColor: Colors.light.tint,
//         borderWidth: 1,
//         borderRadius: 25,
//         paddingHorizontal: wp("5%"),
//     },
//     detailsContainer: {
//         marginVertical: 10,
//         alignItems: "flex-start",
//         alignSelf: "flex-start",
//         left: wp("15%"),
//         paddingTop: hp("8%"),
//     },
//     detailsTitle: {
//         fontSize: 16,
//         fontWeight: "500",
//         marginBottom: 15,
//     },
//     detailsAppointmentInfo: {
//         paddingVertical: 10,
//     },
// });

// AppointmentModal.tsx
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
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

        return () => clearTimeout(handler); // Cleanup timeout on unmount or when value changes
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

    // Effect to handle search based on debounced input
    useEffect(() => {
        handleSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    const handleSearch = (query: string) => {
        if (!query.trim()) {
            // Reset results if query is empty
            setFilteredAppointment([]);
            setIsAppointmentFound(false);
            return;
        }

        const filteredData = Array.isArray(allAppointmentInfo)
            ? allAppointmentInfo.filter((appointment) =>
                  appointment.customerPhoneNumber.includes(query)
              )
            : [];

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
                📅 Date: {item.date}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                ⏰ Time: {item.roundedTime.toString()}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                💼 Service: {item.serviceName}
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                👥 Customers: {item.numberOfCustomers} people
            </Text>
            <Text style={styles.detailsAppointmentInfo}>
                🙍‍♂️ Name: {item.customerName}
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
                <View
                    style={{
                        marginVertical: hp("1.5%"),
                    }}
                >
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
                        }}
                    >
                        <AntDesign
                            name="left"
                            size={28}
                            color={Colors[colorScheme ?? "light"].tint}
                        />
                    </Pressable>
                    <TextInput
                        placeholder="Search by phone number..."
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        keyboardType="phone-pad"
                    />
                    <Pressable onPress={() => handleSearch(searchQuery)}>
                        <AntDesign
                            name="rightcircle"
                            size={28}
                            color={Colors[colorScheme ?? "light"].tint}
                            style={{ marginLeft: wp("2%") }}
                        />
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
        width: wp("72.5%"),
        height: hp("4.5%"),
        marginBottom: hp("2.5%"),
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
        backgroundColor: "#fff",
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
