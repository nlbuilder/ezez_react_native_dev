import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { AppointmentDetailsProps } from "../types/types";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Colors from "@/constants/styles/Colors";
import { AntDesign } from "@expo/vector-icons";

import Animated, {
    Easing,
    interpolate,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import WarningModal from "@/app/(authenticated)/utils/modals/WarningModal";
import { router } from "expo-router";
import { convertTo12HourFormat } from "@/app/(authenticated)/utils/utils";
import { useDeleteAppointmentAPI } from "../apis/deleteAppointmentAPI";

const AppointmentDetails = ({
    appointmentDetails,
    onDelete,
}: {
    appointmentDetails: AppointmentDetailsProps;
    onDelete: (appointmentId: string) => void;
}) => {
    const colorScheme = useColorScheme();

    // *** code to handle the animation of the swipable content ***
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

    // *** code to handle the functionality of the delete button ***
    // warning modal for delete confirmation or cancelation
    const [modalVisible, setModalVisible] = useState(false);

    const { deleteAppointment, isLoading: isDeleteAppointmentLoading } =
        useDeleteAppointmentAPI();

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

        deleteAppointment(appointmentDetails.appointmentId);

        setModalVisible(false);

        // handle back to the original position after delete
        translateX.value = withTiming(0, {
            duration: 500,
            easing: Easing.bezier(0.45, 0, 0.55, 1), // refer to easeInOutQuad in https://easings.net/#
            reduceMotion: ReduceMotion.System,
        });

        console.log(appointmentDetails.appointmentId);
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
    // *** end of code to handle the animation of the swipable content ***

    // *** code to handle the appointment summary ***

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderRadius: hp("2.5%"),
                    borderWidth: 1,
                    borderColor: Colors[colorScheme ?? "light"].tabIconDefault,
                    height: hp("10%"),
                    width: wp("96%"),
                    marginBottom: hp("3.5%"),
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
                                    router.push({
                                        pathname:
                                            "/(authenticated)/components/appointment/screens/EditAppointmentScreen",
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
                            title={
                                "The selected appointment will be deleted. Are you sure?"
                            }
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
                                    borderRadius: hp("2%"),
                                    borderWidth: 1,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .tabIconDefault,
                                    height: hp("10%"),
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
                                <View>
                                    <Text style={{ paddingBottom: hp("1.5%") }}>
                                        {appointmentDetails.date
                                            .split(" ")
                                            .slice(0, 3)
                                            .join(" ")}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                        }}
                                    >
                                        {appointmentDetails.serviceName}
                                    </Text>
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
                                <View>
                                    <Text style={{ paddingBottom: hp("1.5%") }}>
                                        {convertTo12HourFormat(
                                            appointmentDetails.time
                                        )}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ right: wp(".5%") }}>
                                            {
                                                appointmentDetails.numberOfCustomers
                                            }
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            color: Colors[
                                                colorScheme ?? "light"
                                            ].text,
                                            left: wp(".5%"),
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
                                <View>
                                    <Text style={{ paddingBottom: hp("1.5%") }}>
                                        {appointmentDetails.note}
                                    </Text>
                                </View>

                                <View>
                                    <Text>
                                        {appointmentDetails.customerPhoneNumber}
                                    </Text>
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
