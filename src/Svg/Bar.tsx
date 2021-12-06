import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import Svg, { G, Rect } from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect)

const Bar = () => {

    const aniValue = useSharedValue(0)

    const anim = useAnimatedStyle(() => {
        return {
            height: aniValue.value
        }
    })




    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <Svg width="400" height="400" viewBox="0 0 400 400" style={{ borderWidth: 1 }} >
                <AnimatedRect animatedProps={anim} width="100" height="-70" fill="orange" y="400" x="100" />
            </Svg>
            <Button title="random" onPress={() => { aniValue.value = withSpring(Math.floor(Math.random() * 301) * -1) }} />
        </View>

    );
};

export default Bar