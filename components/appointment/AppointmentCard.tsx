import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, {
    clamp,
    Easing,
    SharedValue,
    useAnimatedReaction,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface AppointmentCardProps {
    index: number;
    scrollY: SharedValue<number>;
    activeCardIndex: SharedValue<number | null>;
}

const AppointmentCard = ({
    index,
    scrollY,
    activeCardIndex,
}: AppointmentCardProps) => {
    const [cardHeight, setCardHeight] = useState(0);
    const { height: screenHeight } = useWindowDimensions();

    const translateY = useSharedValue(0);

    useAnimatedReaction(
        () => scrollY.value,
        (current) => {
            translateY.value = clamp(-current, -index * cardHeight * 0.69, 0);
        }
    );

    useAnimatedReaction(
        () => activeCardIndex.value,
        (current, previous) => {
            if (current === previous) {
                return;
            }
            if (activeCardIndex.value === null) {
                // No card selected, move to list view
                translateY.value = withTiming(
                    clamp(-scrollY.value, -index * cardHeight * 0.75, 0)
                );
            } else if (activeCardIndex.value === index) {
                // This card becomes active, show it on top
                translateY.value = withTiming(-index * cardHeight, {
                    easing: Easing.out(Easing.quad),
                    duration: 500,
                });
            } else {
                // Another card is active, move the rest to the bottom
                translateY.value = withTiming(
                    -index * cardHeight * 0.9 + screenHeight * 0.7,
                    {
                        easing: Easing.out(Easing.quad),
                        duration: 500,
                    }
                );
            }
        }
    );

    // useDerivedValue is used to calculate the translateY value
    // and then use the translateY value to handle the scrolling naturally
    // const translateY = useDerivedValue(() =>
    //     clamp(-scrollY.value, -index * cardHeight * 0.75, 0)
    // );

    // def a tap gesture to handle the active card (i.e., the card that is tapped)
    const tap = Gesture.Tap().onEnd(() => {
        if (activeCardIndex.value === null) {
            activeCardIndex.value = index;
        } else {
            activeCardIndex.value = null;
        }
    });

    return (
        <GestureDetector gesture={tap}>
            <View style={styles.container}>
                <Animated.View
                    onLayout={(event) =>
                        setCardHeight(event.nativeEvent.layout.height)
                    }
                    style={[
                        {
                            transform: [
                                {
                                    // use translateY to handle scrolling up and down naturally
                                    translateY: translateY,
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.appointmentCard}>
                        <Text style={styles.title}>{index + 10}:00</Text>
                    </View>
                </Animated.View>
            </View>
        </GestureDetector>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    container: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        // center the card horizontally
        alignItems: "center",
    },
    appointmentCard: {
        backgroundColor: "#81aee6",
        borderRadius: hp("2%"),
        height: hp("20%"),
        width: wp("96%"),
        marginVertical: 5,
        borderColor: "grey",
        borderWidth: 1,
    },
    title: {
        padding: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
});
