import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    useColorScheme,
    Alert,
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
import { validatePassword } from "@/app/(authenticated)/utils/validations/validations";

const SignUpForm = () => {
    const colorScheme = useColorScheme();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSignUpWithEmailPassword = async () => {
        const { isValid, message } = validatePassword(password);

        if (!isValid) {
            Alert.alert("Invalid Password", message);

            return;
        }

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

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View
            style={{
                top: hp("2%"),
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Name */}
            <View style={[styles.authForm, { width: wp("84%") }]}>
                <TextInput
                    placeholder="Display Name"
                    placeholderTextColor={"rgba(189, 195, 199, 0.8)"}
                    style={{ height: "100%", color: "black", paddingLeft: 10 }}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
            </View>

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
                    secureTextEntry={isPasswordVisible ? false : true}
                />
                <Pressable
                    onPress={togglePasswordVisibility}
                    style={{ right: 15 }}
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
                    By selecting Agree and Continue below, I agree to{" "}
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
            <View style={styles.authButton}>
                <Pressable
                    style={{
                        width: wp("84%"),
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
        </View>
    );
};

export default SignUpForm;

const styles = StyleSheet.create({
    authForm: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.tabIconDefault,
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
