import {
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import {
    getAuth,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";

import Colors from "@/constants/styles/Colors";
import NotificationModal from "@/app/(authenticated)/utils/modals/NotificationModal";

const UpdatePassword = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const auth = getAuth();

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Update Password",
            headerBackTitle: "Back",
            presentation: "card",
        });
    }, [navigation]);

    const [email, setEmail] = useState<string>(auth.currentUser?.email ?? "");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const [isPasswordVisible0, setIsPasswordVisible0] =
        useState<boolean>(false);
    const togglePasswordVisibility0 = () => {
        setIsPasswordVisible0(!isPasswordVisible0);
    };

    const [isPasswordVisible1, setIsPasswordVisible1] =
        useState<boolean>(false);
    const togglePasswordVisibility1 = () => {
        setIsPasswordVisible1(!isPasswordVisible1);
    };

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOnOK = () => {
        setShowModal(false);
    };

    const handleChangePassword = async () => {
        if (auth.currentUser) {
            try {
                // Re-authenticate the user
                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email ?? "",
                    currentPassword
                );
                await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                );

                // Proceed to update the password
                await updatePassword(auth.currentUser, newPassword);

                setShowModal(true);
            } catch (error) {
                console.log(
                    "Error during re-authentication or password update:",
                    error
                );
            }
        } else {
            console.log("No user is currently signed in.");
        }
    };

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            // flex: 1,
                            paddingTop: hp("5%"),
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* Email */}
                        <View
                            style={[
                                styles.authForm,
                                {
                                    width: wp("84%"),
                                    backgroundColor:
                                        "rgba(189, 195, 199, 0.25)",
                                    borderColor: "transparent",
                                    // borderColor:
                                    //     Colors[colorScheme ?? "light"]
                                    //         .formBorder,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder={email}
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].placeholder
                                }
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    color: "black",
                                    paddingLeft: 10,
                                }}
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                keyboardType="email-address"
                                editable={false}
                            />
                        </View>

                        {/* Password */}
                        <View
                            style={[
                                styles.authForm,
                                {
                                    width: wp("84%"),
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .formBorder,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Current Password"
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].placeholder
                                }
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    color: "black",
                                    paddingLeft: 10,
                                }}
                                value={currentPassword}
                                onChangeText={(value) =>
                                    setCurrentPassword(value)
                                }
                                secureTextEntry={
                                    isPasswordVisible0 ? false : true
                                }
                            />
                            <Pressable
                                onPress={togglePasswordVisibility0}
                                style={{ right: wp("10%") }}
                            >
                                <Ionicons
                                    name={
                                        isPasswordVisible0 ? "eye-off" : "eye"
                                    }
                                    size={24}
                                    color={Colors.light.tabIconDefault}
                                />
                            </Pressable>
                        </View>

                        {/* New Password */}
                        <View
                            style={[
                                styles.authForm,
                                {
                                    width: wp("84%"),
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .formBorder,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].placeholder
                                }
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    color: "black",
                                    paddingLeft: 10,
                                }}
                                value={newPassword}
                                onChangeText={(value) => setNewPassword(value)}
                                secureTextEntry={
                                    isPasswordVisible1 ? false : true
                                }
                            />
                            <Pressable
                                onPress={togglePasswordVisibility1}
                                style={{ right: wp("10%") }}
                            >
                                <Ionicons
                                    name={
                                        isPasswordVisible1 ? "eye-off" : "eye"
                                    }
                                    size={24}
                                    color={Colors.light.tabIconDefault}
                                />
                            </Pressable>
                        </View>

                        {/* Continue button */}
                        <View
                            style={[
                                styles.confirmButton,
                                {
                                    backgroundColor:
                                        Colors[colorScheme ?? "light"]
                                            .mainButtonBackgroundColor,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .mainButtonBorderColor,
                                },
                            ]}
                        >
                            <Pressable
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    handleChangePassword();
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: Colors[colorScheme ?? "light"]
                                            .textButtonColor,
                                    }}
                                >
                                    Confirm and Continue
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <NotificationModal
                title={"Password Updated Successfully"}
                visible={showModal}
                onOK={handleOnOK}
            />
        </>
    );
};

export default UpdatePassword;

const styles = StyleSheet.create({
    authForm: {
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 35,
        paddingLeft: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1.5%"),
    },
    confirmButton: {
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
