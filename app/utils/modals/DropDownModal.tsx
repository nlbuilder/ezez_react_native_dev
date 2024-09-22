import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
    useColorScheme,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "@/constants/styles/Colors";

type OptionItem = {
    value: string;
    label: string;
};

interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
}

export default function DropdownModal({
    data,
    onChange,
    placeholder,
}: DropDownProps) {
    const colorScheme = useColorScheme();

    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(
        () => setExpanded(!expanded),
        [expanded]
    );

    const [value, setValue] = useState("");

    const buttonRef = useRef<View>(null);

    const [top, setTop] = useState(0);

    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item.label);
        setExpanded(false);
    }, []);
    return (
        <View
            ref={buttonRef}
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const topOffset = layout.y;
                const heightOfComponent = layout.height;

                const finalValue =
                    topOffset +
                    heightOfComponent +
                    (Platform.OS === "android" ? -32 : 3);

                setTop(finalValue);
            }}
        >
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        borderColor:
                            Colors[colorScheme ?? "light"].tabIconDefault,
                    },
                ]}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <Text style={styles.text}>{value || placeholder}</Text>
                <AntDesign name={expanded ? "up" : "down"} />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback
                        onPress={() => setExpanded(false)}
                    >
                        <View style={styles.backdrop}>
                            <View
                                style={[
                                    styles.options,
                                    {
                                        top,
                                    },
                                ]}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.optionItem}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        padding: 20,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    optionItem: {
        height: 40,
        justifyContent: "center",
    },
    separator: {},
    options: {
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        maxHeight: hp("50%"),
    },
    text: {
        opacity: 1,
    },
    button: {
        height: hp("6%"),
        justifyContent: "space-between",
        borderWidth: 1,
        backgroundColor: "#fff",

        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 10,
    },
});
