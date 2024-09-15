import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    cancelAnimation,
    clamp,
    useSharedValue,
    withDecay,
    withClamp,
} from "react-native-reanimated";

import AppointmentCard from "@/components/appointment/AppointmentCard";

const AppointmentCardList = () => {
    const [listHeight, setListHeight] = useState(0);
    const { height: screenHeight } = useWindowDimensions();

    const activeCardIndex = useSharedValue(null);

    const scrollY = useSharedValue(0);
    const maxScrollY = listHeight - screenHeight + 160;

    const pan = Gesture.Pan()
        .onBegin(() => {
            cancelAnimation(scrollY);
        })
        .onChange((event) => {
            // define changeY is the amount of change in the Y direction
            scrollY.value = clamp(scrollY.value - event.changeY, 0, maxScrollY);
        })
        .onEnd((event) => {
            // use withDecay here to create a smooth transition
            // when the user lifts their finger (i.e., slows down and stops)
            scrollY.value = withClamp(
                { min: 0, max: maxScrollY },
                withDecay({ velocity: -event.velocityY })
            );
        });

    const appointmentCards = Array.from({ length: 10 }, (_, index) => index);

    return (
        <GestureDetector gesture={pan}>
            <View
                style={styles.container}
                onLayout={(event) =>
                    setListHeight(event.nativeEvent.layout.height)
                }
            >
                {appointmentCards.map((_, index) => (
                    <AppointmentCard
                        key={index}
                        index={index}
                        scrollY={scrollY}
                        activeCardIndex={activeCardIndex}
                    />
                ))}
            </View>
        </GestureDetector>
    );
};

export default AppointmentCardList;

const styles = StyleSheet.create({
    container: {
        top: 80,
    },
});
