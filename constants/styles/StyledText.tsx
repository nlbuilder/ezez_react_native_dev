import { Text, TextProps } from "./Themed";

// export function MonoText(props: TextProps) {
//     return (
//         <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />
//     );
// }

export function CalibriText(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: "Calibri" }]} />;
}

export function FuzzyBubblesText(props: TextProps) {
    return (
        <Text
            {...props}
            style={[
                props.style,
                {
                    fontFamily: "FuzzyBubbles",
                },
            ]}
        />
    );
}
