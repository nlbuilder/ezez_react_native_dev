import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/styles/Colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AntDesign } from "@expo/vector-icons";

import { signInWithEmailPassword, signInWithGoogle } from "../../utils/utils";
import { useGetBusinessInfoAPI } from "@/app/(authenticated)/components/profile/apis/getBusinessInfoAPI";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;

const SignInForm = () => {
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

    const handleSignInWithEmailPassword = async () => {
        await signInWithEmailPassword(email, password);
    };

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

    return (
        <View
            style={{
                top: hp("6.9%"),
                alignItems: "center",
                justifyContent: "center",
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

            {/* Password */}
            <View style={[styles.authForm, { width: wp("84%") }]}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                    style={{ height: "100%", color: "black", paddingLeft: 10 }}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>

            {/* Continue button */}
            <View style={styles.authButton}>
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
                    <Text style={{ textAlign: "center" }}>Continue</Text>
                </Pressable>
            </View>

            <Text style={{ marginVertical: 18 }}>or</Text>

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
                    <Text style={{ textAlign: "center" }}>
                        Sign in with Google
                    </Text>
                </Pressable>
            </View>

            {/* Dont have an account */}
            <View style={styles.promptTextComponent}>
                <Text>Don't have an account? </Text>
                <Pressable
                    onPress={() => {
                        router.push("/(auth)/screens/SignUp");
                    }}
                >
                    <Text style={{ color: "blue", fontWeight: 500 }}>
                        Sign up
                    </Text>
                </Pressable>
            </View>

            {/* Forgot your password */}
            <View style={styles.promptTextComponent}>
                <Text>Forgot your password? </Text>
                <Pressable
                    onPress={() => {
                        router.push("/(auth)/screens/Reset");
                    }}
                >
                    <Text style={{ color: "blue", fontWeight: 500 }}>
                        Reset
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignInForm;

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
