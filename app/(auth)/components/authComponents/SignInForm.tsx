import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { signInWithEmailPassword, signInWithGoogle } from "../../utils/utils";
import { validateSignInForm } from "@/app/validations/validations";
import Colors from "@/constants/styles/Colors";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;

const SignInForm = () => {
    const colorScheme = useColorScheme();

    useEffect(() => {
        GoogleSignin.configure({
            // go to google cloud console to get the webClientId and iosClientId
            // (i.e., console.cloud.google.com)
            // webClientId can also be found in firebase console under web authentication provider
            webClientId: WEB_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID,
        });
    }, []);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // def a function to sign in with email and password
    const handleSignInWithEmailPassword = async () => {
        const { isValid, message } = validateSignInForm(email, password);

        if (!isValid) {
            Alert.alert("Invalid SignIn", message);

            return;
        }

        await signInWithEmailPassword(email, password);
    };

    // def a function to sign in with google
    const handleSignInWithGoogle = async () => {
        const auth = await signInWithGoogle();

        if (auth) {
            router.push({
                pathname: "/(auth)/screens/loading",
                params: {
                    businessId: auth.uid,
                    name: auth.displayName,
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
            {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View
                style={{
                    // flex: 1,
                    top: hp("2.5%"),
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Email */}
                <View
                    style={[
                        styles.authForm,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].background,
                            borderColor:
                                Colors[colorScheme ?? "light"].formBorder,
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
                    />
                </View>

                {/* Password */}
                <View
                    style={[
                        styles.authForm,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].background,
                            borderColor:
                                Colors[colorScheme ?? "light"].formBorder,
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
                        secureTextEntry={isPasswordVisible ? false : true}
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
                            width: wp("84%"),
                            height: "100%",
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            handleSignInWithEmailPassword();
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: Colors[colorScheme ?? "light"]
                                    .textButtonColor,
                            }}
                        >
                            Continue
                        </Text>
                    </Pressable>
                </View>

                <Text style={{ marginVertical: 18, color: "white" }}>or</Text>

                {/* SignIn with Google */}
                <View
                    style={[
                        styles.authButton,
                        {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative", // ensure overlapping elements align properly
                            marginBottom: hp("2.5%"),
                            backgroundColor:
                                Colors[colorScheme ?? "light"]
                                    .mainButtonBackgroundColor,
                            borderColor:
                                Colors[colorScheme ?? "light"]
                                    .mainButtonBorderColor,
                        },
                    ]}
                >
                    <AntDesign
                        name="google"
                        size={24}
                        style={{
                            position: "absolute",
                            left: 15,
                        }}
                        color={Colors[colorScheme ?? "light"].textButtonColor}
                    />
                    <Pressable
                        style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            handleSignInWithGoogle();
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: Colors[colorScheme ?? "light"]
                                    .textButtonColor,
                            }}
                        >
                            Sign in with Google
                        </Text>
                    </Pressable>
                </View>

                {/* Dont have an account */}
                <View style={styles.promptTextComponent}>
                    <Text style={{ color: "white" }}>
                        Don't have an account?{" "}
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.push("/(auth)/screens/SignUp");
                        }}
                    >
                        <Text
                            style={{
                                color: Colors[colorScheme ?? "light"]
                                    .mainButtonBorderColor,
                                fontWeight: 500,
                            }}
                        >
                            Sign up
                        </Text>
                    </Pressable>
                </View>

                {/* Forgot your password */}
                <View style={styles.promptTextComponent}>
                    <Text
                        style={{
                            color: Colors[colorScheme ?? "light"].background,
                        }}
                    >
                        Forgot your password?{" "}
                    </Text>
                    <Pressable
                        onPress={() => {
                            router.push("/(auth)/screens/Reset");
                        }}
                    >
                        <Text
                            style={{
                                color: Colors[colorScheme ?? "light"]
                                    .mainButtonBorderColor,
                                fontWeight: 500,
                            }}
                        >
                            Reset
                        </Text>
                    </Pressable>
                </View>
            </View>
            {/* </TouchableWithoutFeedback> */}
            {/* </KeyboardAvoidingView> */}
        </>
    );
};

export default SignInForm;

const styles = StyleSheet.create({
    authForm: {
        borderWidth: 1,
        height: hp("6%"),
        width: wp("82%"),
        borderRadius: 35,
        paddingLeft: 10,
        justifyContent: "space-between",
        marginBottom: hp("1.5%"),
        flexDirection: "row",
        alignItems: "center",
    },
    authButton: {
        // backgroundColor: Colors.light.background,
        // borderColor: Colors.light.tabIconDefault,
        borderWidth: 1,
        height: hp("6%"),
        width: wp("82%"),
        borderRadius: 35,
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
