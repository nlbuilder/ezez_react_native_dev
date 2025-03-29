import { Text, TextProps } from "./Themed";

export function CalibriText(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: "Calibri" }]} />;
}

export function Bodoni72Text(props: TextProps) {
    return (
        <Text {...props} style={[props.style, { fontFamily: "Bodoni72" }]} />
    );
}

export function TimesRegularText(props: TextProps) {
    return (
        <Text
            {...props}
            style={[
                props.style,
                {
                    fontFamily: "TimesRegular",
                },
            ]}
        />
    );
}
