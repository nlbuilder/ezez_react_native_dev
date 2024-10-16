import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { signUpWithEmailPassword } from "../utils/utils";
import { router } from "expo-router";
import { auth } from "@/firebase/firebaseConfig";

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    return (
        <View style={{ height: hp("100%"), width: wp("100%") }}>
            {/* Sign Up Title */}
            <View style={{ marginTop: hp("20%") }}>
                <Text style={{}}>Sign up</Text>
            </View>
            <View style={{ alignItems: "center", marginBottom: hp(20) }}>
                {/* Name Input */}
                <View style={styles.authForm}>
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor={"grey"}
                        style={{ height: "100%" }}
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                </View>

                {/* Email */}
                <View style={styles.authForm}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={"grey"}
                        style={{ height: "100%" }}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.authForm}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={"grey"}
                        secureTextEntry
                        style={{ height: "100%" }}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>

                {/* Confirm password */}
                <View style={styles.authForm}>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor={"grey"}
                        secureTextEntry
                        style={{ height: "100%" }}
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                    />
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                    onPress={handleSignUpWithEmailPassword}
                    style={{}}
                >
                    <Text style={[]}>tap to sign up</Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: "absolute",
                    bottom: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            ></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    authForm: {
        backgroundColor: "#EEF7FF",
        width: wp("80%"),
        height: hp("4.5%"),
        borderRadius: 10,
        marginBottom: 20, // for space between forms
        paddingLeft: 20,
    },
});
