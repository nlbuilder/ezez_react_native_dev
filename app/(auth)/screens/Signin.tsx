import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from "react-native";
import React, { useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { signInWithEmailPassword } from "../utils/utils";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignInWithEmailPassword = async () => {
        await signInWithEmailPassword(email, password);
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
            }}
        >
            {/* Sign In Text */}
            <View style={{ marginTop: hp(8), marginBottom: 20 }}>
                <Text style={{}}>Sign in</Text>
            </View>

            {/* Email Input */}
            <View
                style={{
                    backgroundColor: "#EEF7FF",
                    width: wp("80%"),
                    height: 40,
                    borderRadius: 45,
                    marginBottom: 15, // for space between forms
                    paddingLeft: 20,
                }}
            >
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={"grey"}
                    style={{ height: "100%" }}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>

            {/* Password Input */}
            <View
                style={{
                    backgroundColor: "#EEF7FF",
                    width: wp("80%"),
                    height: 40,
                    borderRadius: 45,
                    marginBottom: 15, // for space between forms
                    paddingLeft: 20,
                }}
            >
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={"grey"}
                    secureTextEntry
                    style={{ height: "100%" }}
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                />
            </View>

            {/* Sign In & Reset Password Buttons */}
            <TouchableOpacity
                onPress={handleSignInWithEmailPassword}
                style={{ marginTop: 10 }}
            >
                <Text style={{}}>tap to sign in</Text>
            </TouchableOpacity>

            <View
                style={{
                    marginVertical: 10,
                    alignItems: "center",
                }}
            >
                <Text style={[{ fontSize: 18 }]}>or</Text>
            </View>
        </View>
    );
}
