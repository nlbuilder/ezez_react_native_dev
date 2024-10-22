import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    useColorScheme,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/styles/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { resetPassword } from "../../utils/utils";
import NotificationModal from "@/app/(authenticated)/utils/modals/NotificationModal";

const ResetForm = () => {
    const colorScheme = useColorScheme();
    const [email, setEmail] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleResetPassword = async () => {
        if (email) {
            try {
                await resetPassword(email);
                setShowModal(true);
            } catch (error) {
                console.error("Error when resetting password: ", error);
            }
        }
    };

    const handleOnOK = () => {
        setShowModal(false);
        router.push({
            pathname: "/(auth)/screens/Welcome",
        });
    };

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                bottom: hp("8%"),
            }}
        >
            {/* Email */}
            <View style={[styles.authForm, { width: wp("84%") }]}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                    style={{ height: "100%", color: "black", paddingLeft: 10 }}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>

            {/* Agree And Continue button */}
            <View style={styles.authButton}>
                <Pressable
                    style={{
                        width: wp("84%"),
                        height: "100%",
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        handleResetPassword();
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Reset</Text>
                </Pressable>
            </View>

            {/* Back button */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    position: "absolute",
                    top: hp("56%"),
                    alignSelf: "flex-start",
                    left: wp("2.5%"),
                }}
            >
                <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                        router.push({
                            pathname: "/(auth)/screens/Welcome",
                        });
                    }}
                >
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color="black"
                        style={{ marginRight: 8 }}
                    />
                    <Text>Back</Text>
                </Pressable>
            </View>

            {/* Notification modal */}
            <NotificationModal
                title={
                    "A password reset email has been sent to your inbox. Please check your email and follow the instructions to reset your password."
                }
                visible={showModal}
                onOK={handleOnOK}
            />
        </View>
    );
};

export default ResetForm;

const styles = StyleSheet.create({
    authForm: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.tabIconDefault,
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 35,
        paddingLeft: 10,
        justifyContent: "center",
        marginBottom: hp("1.5%"),
    },
    authButton: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.tabIconDefault,
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 35,
        top: hp("1.5%"),
    },
    promptTextComponent: {
        flexDirection: "row",
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        left: 15,
    },
});
