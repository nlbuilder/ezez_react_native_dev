import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { router, Tabs, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Service = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    // handle the header when this screen is rendered
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Service Information",
            headerBackTitle: "Back",
            headerLeft: () => (
                <Pressable
                    onPress={() =>
                        router.replace("/(authenticated)/(tabs)/profile")
                    }
                >
                    <AntDesign
                        name="leftcircleo"
                        size={24}
                        color={colorScheme === "dark" ? "white" : "black"}
                    />
                </Pressable>
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Service</Text>
        </View>
    );
};

export default Service;

const styles = StyleSheet.create({});
