import React from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Button,
} from 'react-native';
import Animated, { useAnimatedProps, useAnimatedRef, useDerivedValue, useSharedValue, withTiming, } from 'react-native-reanimated';
import Svg, { Circle, G, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedInput = Animated.createAnimatedComponent(TextInput)

const CircleProgress = () => {
    const offset = useSharedValue(2 * Math.PI * 100)

    const radius = 100
    const circumference = 2 * Math.PI * 100
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: offset.value
    }))

    const progressValue = useDerivedValue(() => {
        return `${100 - Math.floor(offset.value / circumference * 100)}`;
    });

    const animatedText = useAnimatedProps(() => {
        return {
            text: progressValue.value,
        } as any;
    });
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <Svg width={(radius + 10) * 2} height={(radius + 10) * 2} style={{ borderWidth: 1, flex: 1, alignContent: 'center' }}>
                <G rotation="-90" originX={(radius + 10)} originY={(radius + 10)} >
                    <Circle cx={"50%"} cy={"50%"} fill="none" r={radius} stroke="black" strokeWidth={10} />
                    <AnimatedCircle strokeLinecap="round" animatedProps={animatedProps} cx={"50%"} cy={"50%"} fill="none" r={radius} stroke="gray" strokeDasharray={circumference} strokeWidth={10} />
                </G>
                <View style={{ justifyContent: "center", alignItems: "center", width: (radius + 10) * 2, height: (radius + 10) * 2 }} >
                    <AnimatedInput editable={false} defaultValue={"0"} animatedProps={animatedText} />
                </View>


            </Svg>

            <Button title={"randoms"} onPress={() => { offset.value = withTiming((circumference - (circumference * Math.floor(Math.random() * 101) / 100)), { duration: 500 }) }} />
        </View>
    );
};



export default CircleProgress;
