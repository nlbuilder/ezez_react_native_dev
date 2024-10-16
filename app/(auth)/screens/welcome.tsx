import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/constants/styles/Themed";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
    signUpWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
} from "../utils/utils";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID;

// this line is to keep the web browser showing inside the app
WebBrowser.maybeCompleteAuthSession();

const welcome = () => {
    useEffect(() => {
        GoogleSignin.configure({
            // go to google cloud console to get the webClientId and iosClientId
            // (i.e., console.cloud.google.com)
            // webClientId can also be found in firebase console under web authentication provider
            webClientId: WEB_CLIENT_ID,
            iosClientId: IOS_CLIENT_ID,
        });
    }, []);

    const email = "xfactor@yahoo.com";
    const password = "123456";
    const name = "Hello";

    const handleSignUpWithEmailPassword = async () => {
        const auth = await signUpWithEmailPassword(email, password, name);

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
        <>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <Text style={{ marginVertical: hp("2%") }}>welcome</Text>

                <Pressable onPress={handleSignInWithEmailPassword}>
                    <View
                        style={{
                            padding: 10,
                            marginVertical: hp("2%"),
                            backgroundColor: "lightblue",
                            borderRadius: 15,
                        }}
                    >
                        <Text>Signin with Email</Text>
                    </View>
                </Pressable>

                <Pressable onPress={handleSignUpWithEmailPassword}>
                    <View
                        style={{
                            padding: 10,
                            marginVertical: hp("2%"),
                            backgroundColor: "lightblue",
                            borderRadius: 15,
                        }}
                    >
                        <Text>SignUp with Email</Text>
                    </View>
                </Pressable>

                <Pressable onPress={handleSignInWithGoogle}>
                    <View
                        style={{
                            padding: 10,
                            marginVertical: hp("2%"),
                            backgroundColor: "lightblue",
                            borderRadius: 15,
                        }}
                    >
                        <Text>Signin Google</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => {
                        router.push({
                            pathname: "/(auth)/screens/Signup",
                        });
                    }}
                >
                    <View
                        style={{
                            padding: 10,
                            marginVertical: hp("2%"),
                            backgroundColor: "lightblue",
                            borderRadius: 15,
                        }}
                    >
                        <Text>to sign up</Text>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default welcome;

const styles = StyleSheet.create({});
