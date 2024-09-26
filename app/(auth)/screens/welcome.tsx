import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/constants/styles/Themed";
import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
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

// this line is to keep the web browser showing inside the app
WebBrowser.maybeCompleteAuthSession();

const welcome = () => {
    useEffect(() => {
        GoogleSignin.configure({
            // go to google cloud console to get the webClientId and iosClientId
            // (i.e., console.cloud.google.com)
            // webClientId can also be found in firebase console under web authentication provider
            webClientId:
                "179053777002-2g42r0t3tlbarn61q235h06j3t9u9egu.apps.googleusercontent.com",
            iosClientId:
                "179053777002-i1j6kelmf13id46hshitvn4o0lseknab.apps.googleusercontent.com",
        });
    }, []);

    const handleSignInWithEmailPassword = async () => {
        signInWithEmailPassword("etaylor@example.net", "#AJyhh!P4o");
    };

    const handleSignInWithGoogle = async () => {
        signInWithGoogle();
    };

    const handleSignOut = async () => {
        signOut();
    };

    return (
        <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
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
    );
};

export default welcome;

const styles = StyleSheet.create({});
