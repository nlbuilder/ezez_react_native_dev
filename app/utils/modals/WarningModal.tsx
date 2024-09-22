import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "@/constants/styles/Colors";

interface WarningModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const WarningModal = ({ visible, onConfirm, onCancel }: WarningModalProps) => {
    const colorScheme = useColorScheme();

    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={[styles.modalContainer]}>
                <View
                    style={[
                        styles.modalContent,
                        {
                            backgroundColor:
                                Colors[colorScheme ?? "light"].background,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.modalText,
                            { color: Colors[colorScheme ?? "light"].text },
                        ]}
                    >
                        This appointment will be deleted
                    </Text>

                    <View style={[styles.separator]}></View>
                    <Pressable style={styles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.buttonConfirmText}>Delete</Text>
                    </Pressable>

                    <View style={styles.separator}></View>
                    <Pressable
                        style={[
                            styles.cancelButton,
                            {
                                borderColor:
                                    Colors[colorScheme ?? "light"].background,
                            },
                        ]}
                        onPress={onCancel}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: Colors[colorScheme ?? "light"]
                                    .tabIconSelected,
                            }}
                        >
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default WarningModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: wp("96%"),
        borderColor: "white",
        borderWidth: 1,
        padding: 20,
        borderRadius: 15,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "rgba(189, 195, 199, 0.5)",
    },
    confirmButton: {
        width: wp("96%"),
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        top: 5,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonConfirmText: {
        color: "red",
        textAlign: "center",
        fontSize: 18,
    },
});
