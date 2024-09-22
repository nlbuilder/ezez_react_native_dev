import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DropdownModal from "../utils/modals/DropDownModal";

const settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>business Profile</Text>
            <DropdownModal
                data={[
                    { value: "🐈", label: "🐈 un Gato" },
                    { value: "🦮", label: "🦮 un Perro" },
                    { value: "🐍", label: "🐍 una serpiente" },
                ]}
                onChange={console.log}
                placeholder="Select pet"
            />
        </View>
    );
};

export default settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "20%",
        width: "90%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
