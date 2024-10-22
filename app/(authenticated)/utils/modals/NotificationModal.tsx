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
    title: string;
    visible: boolean;
    onOK: () => void;
}

const NotificationModal = ({ title, visible, onOK }: WarningModalProps) => {
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
                        {title}
                    </Text>

                    <View style={[styles.separator]}></View>
                    <Pressable style={styles.OKButton} onPress={onOK}>
                        <Text style={styles.buttonOKText}>Ok</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default NotificationModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: wp("69%"),
        borderColor: "white",
        borderWidth: 1,
        padding: 20,
        borderRadius: 25,
        alignItems: "center",
    },
    modalText: {
        textAlign: "center",
        paddingVertical: hp("1%"),
        lineHeight: 20,
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: "rgba(189, 195, 199, 0.5)",
        marginTop: hp("2%"),
    },
    OKButton: {
        width: wp("69%"),
        paddingVertical: hp("1%"),
    },
    buttonOKText: {
        color: "green",
        textAlign: "center",
        fontSize: 16,
        top: 9,
    },
});
