import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    useColorScheme,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/styles/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, router } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { signUpWithEmailPassword } from "../../utils/utils";
import { validateSignUpForm } from "@/app/validations/validations";

const SignUpForm = () => {
    const colorScheme = useColorScheme();

    // const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSignUpWithEmailPassword = async () => {
        const { isValid, message } = validateSignUpForm(
            email,
            password,
            confirmPassword
        );

        if (!isValid) {
            Alert.alert("Invalid Password", message);

            return;
        }

        const auth = await signUpWithEmailPassword(
            email,
            password
            // name
        );

        if (auth) {
            router.push({
                pathname: "/(auth)/screens/loading",
                params: {
                    businessId: auth.uid,
                    // name: "auth.displayName",
                    email: auth.email,
                },
            });
        }
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            // flex: 1,
                            top: hp("2.5%"),
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* Name */}
                        {/* <View style={[styles.authForm, { width: wp("84%") }]}>
                <TextInput
                    placeholder="Display Name"
                    placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                    style={{ height: "100%", color: "black", paddingLeft: 10 }}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
            </View> */}

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
                                placeholder="Password"
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].placeholder
                                }
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    color: "black",
                                    paddingLeft: 10,
                                }}
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                                secureTextEntry={
                                    isPasswordVisible ? false : true
                                }
                            />
                            <Pressable
                                onPress={togglePasswordVisibility}
                                style={{ right: wp("10%") }}
                            >
                                <Ionicons
                                    name={isPasswordVisible ? "eye-off" : "eye"}
                                    size={24}
                                    color={Colors.light.tabIconDefault}
                                />
                            </Pressable>
                        </View>

                        {/* Confirm Password */}
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
                                placeholder="Confirm password"
                                placeholderTextColor={
                                    Colors[colorScheme ?? "light"].placeholder
                                }
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    color: "black",
                                    paddingLeft: 10,
                                }}
                                value={confirmPassword}
                                onChangeText={(value) =>
                                    setConfirmPassword(value)
                                }
                                secureTextEntry={
                                    isPasswordVisible ? false : true
                                }
                            />
                            <Pressable
                                onPress={togglePasswordVisibility}
                                style={{ right: wp("10%") }}
                            >
                                <Ionicons
                                    name={isPasswordVisible ? "eye-off" : "eye"}
                                    size={24}
                                    color={Colors.light.tabIconDefault}
                                />
                            </Pressable>
                        </View>

                        <View style={{ width: wp("80%"), marginVertical: 10 }}>
                            <Text>
                                By selecting Agree and Continue below, I agree
                                to{" "}
                                <Link href="https://example.com" asChild>
                                    <Text
                                        style={{
                                            color: "blue",
                                        }}
                                    >
                                        Terms of Service and Privacy Policy
                                    </Text>
                                </Link>
                            </Text>
                        </View>

                        {/* Agree And Continue button */}
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
                                    handleSignUpWithEmailPassword();
                                }}
                            >
                                <Text style={{ textAlign: "center" }}>
                                    Agree and Continue
                                </Text>
                            </Pressable>
                        </View>

                        {/* Back button */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                position: "absolute",
                                top: hp("44%"),
                                alignSelf: "flex-start",
                                left: wp("5%"),
                            }}
                        >
                            <Pressable
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: wp("2.5%"),
                                }}
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
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignUpForm;

const styles = StyleSheet.create({
    authForm: {
        // backgroundColor: Colors.light.background,
        // borderColor: Colors.light.tabIconDefault,
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
    promptTextComponent: {
        flexDirection: "row",
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        left: 15,
    },
});
