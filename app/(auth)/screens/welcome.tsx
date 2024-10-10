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
    signInWithEmailPassword,
    signInWithGoogle,
    signOut,
} from "../utils/utils";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "@env";

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

    const handleSignInWithEmailPassword = async () => {
        signInWithEmailPassword("etaylor@example.net", "#AJyhh!P4o");
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

    const handleSignOut = async () => {
        signOut();
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
                        <Text>Signin</Text>
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
            </View>
        </>
    );
};

export default welcome;

const styles = StyleSheet.create({});
