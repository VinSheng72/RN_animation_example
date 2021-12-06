import React, { useEffect } from 'react'
import { View, Text, Button, Dimensions, ImageBackground } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'


const AnimatedView = Animated.createAnimatedComponent(View)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type ContextInterface = {
    translateX: number
    translateY: number
}

const GestureDot = () => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const backgroundValue = useSharedValue("white");

    const vStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
        }
    })

    const bStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundValue.value
        }
    })


    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextInterface>({
        onStart: (event, ctx) => {
            ctx.translateX = translateX.value;
            ctx.translateY = translateY.value;
        },
        onActive: (event, ctx) => {

            const x = event.translationX + ctx.translateX
            const y = event.translationY + ctx.translateY

            if (y < 0) translateY.value = 0;
            else if (y > windowHeight - 100) translateY.value = windowHeight - 100;
            else translateY.value = y;

            if (x < 0) translateX.value = 0;
            else if (x > windowWidth - 100) translateX.value = windowWidth - 100;
            else translateX.value = x;

            console.log("x : " + x)
            console.log("y : " + y)
            console.log(windowWidth - 100)
            //top left
            if (x < 100 && y < 100) backgroundValue.value = "red";
            //top right
            else if (x > windowWidth - 200 && y < 100) backgroundValue.value = "orange";
            //bottom left
            else if (x < 100 && y > windowHeight - 200) backgroundValue.value = "green";
            //bottom right
            else if (x > windowWidth - 200 && y > windowHeight - 200) backgroundValue.value = "aquamarine";
            else backgroundValue.value = "white"

        },
        onEnd: (event, ctx) => {
            translateX.value = withDecay({
                velocity: event.velocityX,
                clamp: [0, windowWidth - 100],
            });
            translateY.value = withDecay({
                velocity: event.velocityY,
                clamp: [0, windowHeight - 100],
            });



        }
    })

    return (
        <AnimatedView style={[bStyle, { height: windowHeight }]} >
            <PanGestureHandler onGestureEvent={panGesture}  >
                <AnimatedView style={[vStyle, { height: 100, width: 100, backgroundColor: "blue" }]} />
            </PanGestureHandler>
            <Svg width={windowWidth} height={windowHeight} style={{ borderColor: "yellow", borderWidth: 10, position: "absolute" }} >
                {/* <Circle r="180" stroke="black" />
                <Circle r="180" stroke="black" cx={windowWidth} /> */}
            </Svg>
        </AnimatedView>

    )
}

export default GestureDot
