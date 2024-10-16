import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Platform,
    useColorScheme,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
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
    // placeholder: string;
}

export default function DropDownCompactModal({
    data,
    onChange,
}: // placeholder,
DropDownProps) {
    const colorScheme = useColorScheme();

    const [value, setValue] = useState("");

    const buttonRef = useRef<View>(null);

    const [top, setTop] = useState(0);

    const onSelect = useCallback((item: OptionItem) => {
        onChange(item);
        setValue(item.label);
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
            <View style={styles.options}>
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
    );
}

const styles = StyleSheet.create({
    optionItem: {
        height: 40,
        justifyContent: "center",
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 5,
    },
    options: {
        backgroundColor: "white",
        width: "50%",
        padding: 10,
        borderRadius: 20,
        maxHeight: hp("50%"),
        borderColor: "#ccc",
        borderWidth: 1,
    },
});
