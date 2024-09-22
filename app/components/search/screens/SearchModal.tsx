// AppointmentModal.tsx
import React from "react";
import { Modal, Pressable, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "@/constants/styles/Themed";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/constants/styles/Colors";
import { TextInput } from "react-native-gesture-handler";
import { ModalProps } from "../types";

const SearchModal = ({ visible, onClose }: ModalProps) => {
    const colorScheme = useColorScheme();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View
                style={[
                    styles.modalContainer,
                    {
                        backgroundColor:
                            Colors[colorScheme ?? "light"].tabIconDefault,
                    },
                ]}
            >
                <View
                    style={[
                        styles.modalContent,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].background,
                        },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",

                            marginVertical: hp("8%"),
                        }}
                    >
                        <Pressable onPress={onClose}>
                            <AntDesign
                                name="left"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                            />
                        </Pressable>
                        <TextInput
                            placeholder="Ask me anything..."
                            style={{
                                width: wp("75%"),
                                height: hp("4%"),
                                borderColor:
                                    Colors[colorScheme ?? "light"].tint,
                                borderWidth: 1,
                                borderRadius: 25,
                                paddingHorizontal: wp("5%"),
                            }}
                        />
                        <Pressable
                            onPress={() => {
                                console.log("search pressed");
                            }}
                        >
                            <AntDesign
                                name="rightcircle"
                                size={28}
                                color={Colors[colorScheme ?? "light"].tint}
                                style={{ marginLeft: wp("2%") }}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SearchModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        borderRadius: 20,
        width: wp("100%"),
        height: hp("100%"),
        alignItems: "center",
    },
});
