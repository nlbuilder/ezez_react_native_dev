import {
    Pressable,
    StyleSheet,
    TextInput,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { AppointmentDetailsProps } from "../types";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import dummyServiceData from "@/dummy/dummyServiceData.json";

import Animated, {
    Easing,
    interpolate,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import WarningModal from "@/app/utils/modals/WarningModal";
import { router } from "expo-router";

const AppointmentDetails = ({
    appointmentDetails,
    onDelete,
}: {
    appointmentDetails: AppointmentDetailsProps;
    onDelete: (id: string) => void;
}) => {
    const colorScheme = useColorScheme();

    // editng date object
    const [dateObject, setDateObject] = useState(
        new Date(appointmentDetails.date)
    );
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDateObject(selectedDate);
        }
    };

    // editing time object
    const [hours, minutes] = appointmentDetails.time.split(":").map(Number);
    const timeObject0 = new Date();
    timeObject0.setHours(hours, minutes, 0, 0);
    const [timeObject, setTimeObject] = useState(timeObject0);
    const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        if (selectedTime) {
            setTimeObject(selectedTime);
        }
    };

    // DropDownPicker for service title editing
    const [serviceItems, setServiceItems] = useState(dummyServiceData);

    const [editNumberOfCustomers, setEditNumberOfCustomers] = useState(
        appointmentDetails.numberOfCustomers.toString()
    );
    const [editCustomerPhoneNumber, setEditCustomerPhoneNumber] = useState(
        appointmentDetails.customerPhoneNumber
    );
    const [editNote, setEditNote] = useState(appointmentDetails.note);

    const [isEditable, setIsEditable] = useState(false);

    const handleEditButton = () => {
        setIsEditable(!isEditable);
    };

    // handle swipe left to delete and edit
    const translateX = useSharedValue(0);
    const showDeleteButton = useSharedValue(false);

    const { width: screenWidth } = useWindowDimensions();

    const pan = Gesture.Pan()
        .onChange((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            } else if (event.translationX > 0) {
                translateX.value = 0;
            }
        })
        .onEnd((event) => {
            // if swiped to the left a distance of .25 of the screen width
            // => show the delete button
            if (Math.abs(translateX.value) > screenWidth * 0.25) {
                translateX.value = withTiming(-screenWidth * 0.5, {
                    duration: 500,
                    easing: Easing.bezier(0.45, 0, 0.55, 1), // refer to easeInOutQuad in https://easings.net/#
                    reduceMotion: ReduceMotion.System,
                }); // swipe enough to show delete button
                showDeleteButton.value = true;
            } else {
                // if not swiped enough, reset the position
                translateX.value = withTiming(0, {
                    duration: 500,
                    easing: Easing.bezier(0.45, 0, 0.55, 1), // refer to easeInOutQuad in https://easings.net/#
                    reduceMotion: ReduceMotion.System,
                });
                showDeleteButton.value = false;
            }
        });

    // animated style to move the swipable content
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    // animated style for the delete button opacity (fade in when swiped enough)
    const deleteButtonStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            // if swiped to the left a distance of .225 of the screen width
            // => show the delete button with opacity = 1
            [0, -screenWidth * 0.225],
            [0, 1]
        ),
    }));

    // warning modal for delete confirmation or cancelation
    const [modalVisible, setModalVisible] = useState(false);

    const handleDeletePress = () => {
        setModalVisible(true);
        translateX.value = withTiming(-screenWidth * 1, {
            duration: 500,
            easing: Easing.bezier(0.45, 0, 0.55, 1), // refer to easeInOutQuad in https://easings.net/#
            reduceMotion: ReduceMotion.System,
        });
        showDeleteButton.value = false;
    };

    const confirmDelete = () => {
        console.log("delete confirmed");
        onDelete(appointmentDetails.id);
        setModalVisible(false);
    };

    const cancelDelete = () => {
        setModalVisible(false);

        translateX.value = withTiming(0, {
            duration: 500,
            easing: Easing.bezier(0.45, 0, 0.55, 1), // refer to easeInOutQuad in https://easings.net/#
            reduceMotion: ReduceMotion.System,
        });
        showDeleteButton.value = false;
    };

    return (
        <View>
            {/* edit button */}
            {/* <View
                style={{
                    width: wp("90%"),
                    alignItems: "flex-end",
                    marginBottom: hp(".5%"),
                }}
            >
                <Pressable
                    onPress={() => {
                        router.push(
                            "/components/appointment/screens/EditAppointmentScreen"
                        );
                        // handleEditButton();
                        console.log("edit button pressed");
                    }}
                >
                    <AntDesign
                        name={isEditable ? "check" : "edit"}
                        size={24}
                        color={Colors[colorScheme ?? "light"].tint}
                    />
                </Pressable>
            </View> */}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderRadius: hp("2.5%"),
                    borderWidth: 1,
                    borderColor: Colors[colorScheme ?? "light"].tabIconDefault,
                    height: hp("15%"),
                    width: wp("96%"),
                    marginBottom: isEditable ? hp("4.5%") : hp("4.5"),
                }}
            >
                <GestureDetector gesture={pan}>
                    <View>
                        {/* Edit and Delete buttons */}
                        <Animated.View
                            style={[
                                {
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    flexDirection: "row", // Ensure the buttons are side by side
                                    justifyContent: "flex-end", // Align the buttons to the right
                                    alignItems: "center",
                                    backgroundColor: !modalVisible
                                        ? "#007AFF"
                                        : "red",
                                    width: wp("100%"),
                                    borderTopRightRadius: hp("2.5%"),
                                    borderBottomRightRadius: hp("2.5%"),
                                },
                                deleteButtonStyle, // apply the animated style for opacity
                            ]}
                        >
                            {/* Edit Button */}
                            <Pressable
                                onPress={() => {
                                    console.log("edit pressed");
                                    router.push({
                                        pathname:
                                            "/components/appointment/screens/EditAppointmentScreen",
                                        params: {
                                            data: JSON.stringify(
                                                appointmentDetails
                                            ),
                                        },
                                    });
                                    translateX.value = withTiming(0, {
                                        duration: 500,
                                        easing: Easing.bezier(0.45, 0, 0.55, 1), // refer to easeInOutQuad in https://easings.net/#
                                        reduceMotion: ReduceMotion.System,
                                    });
                                }}
                                style={{
                                    backgroundColor: !modalVisible
                                        ? "rgba(0, 122, 255,1)"
                                        : "red",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: wp("25%"),
                                    height: "100%",
                                    marginLeft: wp("1%"), // Small space between buttons
                                }}
                            >
                                <AntDesign
                                    name="edit"
                                    size={24}
                                    color={
                                        !modalVisible ? "white" : "transparent"
                                    }
                                />
                                <Text
                                    style={{
                                        color: !modalVisible
                                            ? "white"
                                            : "transparent",
                                        paddingTop: 10,
                                    }}
                                >
                                    Edit
                                </Text>
                            </Pressable>

                            {/* Delete Button */}
                            <Pressable
                                onPress={() => {
                                    console.log("delete pressed");
                                    handleDeletePress();
                                }}
                                style={{
                                    backgroundColor: "red",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: wp("25%"),
                                    height: "100%",
                                    borderTopRightRadius: hp("2.5%"),
                                    borderBottomRightRadius: hp("2.5%"),
                                    right: modalVisible ? wp("69%") : 0,
                                }}
                            >
                                <AntDesign
                                    name="delete"
                                    size={24}
                                    color="white"
                                />
                                <Text
                                    style={{ color: "white", paddingTop: 10 }}
                                >
                                    Delete
                                </Text>
                            </Pressable>
                        </Animated.View>

                        {/* Warning Modal Show */}
                        <WarningModal
                            visible={modalVisible}
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                        />

                        {/* animateing content (i.e., swipable content) */}
                        <Animated.View
                            style={[
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderRadius: hp("2.5%"),
                                    borderWidth: 1,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    height: hp("15%"),
                                    width: wp("96%"),

                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                animatedStyle,
                            ]}
                        >
                            {/* 1st column */}
                            <View
                                style={{
                                    width: wp("30%"),
                                    alignItems: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <View
                                    style={{
                                        borderColor: isEditable
                                            ? Colors[colorScheme ?? "light"]
                                                  .tabIconSelected
                                            : "transparent",
                                        borderWidth: 1,
                                        borderRadius: 15,
                                        width: wp("30%"),
                                        height: hp("4.5%"),
                                        transform: [{ scale: 0.9 }], // a trick to customize the date text input
                                    }}
                                >
                                    <DateTimePicker
                                        value={dateObject}
                                        mode={"date"}
                                        onChange={onChangeDate}
                                        disabled={!isEditable}
                                    />
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        width: wp("30%"),
                                        height: hp("4.5%"),
                                        top: hp(".5%"),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderColor: "transparent",
                                    }}
                                >
                                    {!isEditable ? (
                                        <Text
                                            style={{
                                                color: Colors[
                                                    colorScheme ?? "light"
                                                ].text,
                                            }}
                                        >
                                            {appointmentDetails.serviceTitle}
                                        </Text>
                                    ) : (
                                        <View style={{ left: wp(".5%") }}>
                                            <RNPickerSelect
                                                onValueChange={(value) =>
                                                    console.log(value)
                                                }
                                                items={serviceItems.map(
                                                    (item) => {
                                                        return {
                                                            label: item.label,
                                                            value: item.value,
                                                        };
                                                    }
                                                )}
                                                disabled={!isEditable}
                                                placeholder={{
                                                    label: "Select a service",
                                                    value: null,
                                                }}
                                                style={{
                                                    inputIOS: {
                                                        color: Colors[
                                                            colorScheme ??
                                                                "light"
                                                        ].text,
                                                    },
                                                    inputAndroid: {
                                                        color: Colors[
                                                            colorScheme ??
                                                                "light"
                                                        ].text,
                                                    },
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* 2nd column */}
                            <View
                                style={{
                                    width: wp("30%"),
                                    alignItems: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <View
                                    style={{
                                        borderColor: isEditable
                                            ? Colors[colorScheme ?? "light"]
                                                  .tabIconSelected
                                            : "transparent",
                                        borderWidth: 1,
                                        borderRadius: 15,
                                        height: hp("4.5%"),
                                        width: wp("30%"),
                                        // bottom: hp(".1%"),
                                        transform: [{ scale: 0.86 }], // a trick to customize the time text input
                                    }}
                                >
                                    <DateTimePicker
                                        value={timeObject}
                                        mode={"time"}
                                        onChange={onChangeTime}
                                        disabled={!isEditable}
                                        minuteInterval={15}
                                        is24Hour={true}
                                        style={{
                                            right: wp("2.2%"),
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        width: wp("22.5%"),
                                        height: hp("4.5%"),
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: hp(".5%"),
                                    }}
                                >
                                    <View
                                        style={{
                                            borderColor: isEditable
                                                ? Colors[colorScheme ?? "light"]
                                                      .tabIconSelected
                                                : "transparent",
                                            borderWidth: 1,
                                            borderRadius: 15,
                                            width: wp("8%"),
                                            height: hp("4.5%"),
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TextInput
                                            value={editNumberOfCustomers}
                                            onChangeText={
                                                setEditNumberOfCustomers
                                            }
                                            editable={isEditable}
                                            style={{
                                                color: Colors[
                                                    colorScheme ?? "light"
                                                ].text,
                                            }}
                                            keyboardType="number-pad"
                                            placeholder={isEditable ? "0" : ""}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        }}
                                    >
                                        people
                                    </Text>
                                </View>
                            </View>

                            {/* 3rd column */}
                            <View
                                style={{
                                    width: wp("30%"),
                                    alignItems: "center",
                                    alignSelf: "center",
                                }}
                            >
                                <View
                                    style={{
                                        borderColor: isEditable
                                            ? Colors[colorScheme ?? "light"]
                                                  .tabIconSelected
                                            : "transparent",
                                        borderWidth: 1,
                                        borderRadius: 15,
                                        width: wp("30%"),
                                        height: hp("4.5%"),
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextInput
                                        value={editNote}
                                        onChangeText={setEditNote}
                                        editable={isEditable}
                                        style={{
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        }}
                                        placeholder={
                                            isEditable ? "Add a note" : ""
                                        }
                                    />
                                </View>

                                <View
                                    style={{
                                        borderColor: isEditable
                                            ? Colors[colorScheme ?? "light"]
                                                  .tabIconSelected
                                            : "transparent",
                                        borderWidth: 1,
                                        borderRadius: 15,
                                        width: wp("30%"),
                                        height: hp("4.5%"),
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: hp(".5%"),
                                    }}
                                >
                                    <TextInput
                                        value={editCustomerPhoneNumber}
                                        onChangeText={
                                            setEditCustomerPhoneNumber
                                        }
                                        editable={isEditable}
                                        style={{
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        }}
                                        keyboardType="phone-pad" // to handle phone numbers
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </GestureDetector>
            </View>
        </View>
    );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
    regularText: {},
});
