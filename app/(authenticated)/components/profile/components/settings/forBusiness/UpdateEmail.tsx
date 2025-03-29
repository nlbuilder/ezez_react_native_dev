import {
    Alert,
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
import { useNavigation } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { updateEmail } from "firebase/auth";

import Colors from "@/constants/styles/Colors";
import { useAuth } from "@/app/(auth)/components/hooks/useAuth";
import NotificationModal from "@/app/(authenticated)/utils/modals/NotificationModal";
import { validateEmailFormat } from "@/app/validations/validations";

const UpdateEmail = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const { user } = useAuth() as any;

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Update Email",
            headerBackTitle: "Back",
            presentation: "card",
        });
    }, [navigation]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOnOK = () => {
        setShowModal(false);
    };

    const [email, setEmail] = useState<string>("");

    const handleUpdateEmail = async () => {
        const { isValid, message } = validateEmailFormat(email);

        if (!isValid) {
            Alert.alert("Invalid Email", message);

            return;
        }

        try {
            if (email === user?.email) {
                return;
            } else {
                if (user) {
                    await updateEmail(user, email);
                }

                setShowModal(true);
            }
        } catch (error) {
            console.log(
                "Error in handleUpdateEmail: [frontend error message]",
                error
            );
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
                                        Colors[colorScheme ?? "light"]
                                            .background,
                                    borderColor:
                                        Colors[colorScheme ?? "light"]
                                            .formBorder,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Email"
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
                            />
                        </View>

                        {/* Continue button */}
                        <View
                            style={[
                                styles.authButton,
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
                                    handleUpdateEmail();
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
                title={
                    "We have sent a verification email to your new email address. Please verify your email address to continue."
                }
                visible={showModal}
                onOK={handleOnOK}
            />
        </>
    );
};

export default UpdateEmail;

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
    authButton: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.tabIconDefault,
        borderWidth: 1,
        height: hp("6%"),
        width: wp("84%"),
        borderRadius: 35,
        top: hp("1.5%"),
    },
});
