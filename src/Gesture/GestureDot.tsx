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
    const topLeftX = useSharedValue(0)
    const topLeftY = useSharedValue(0)
    const topRightX = useSharedValue(0)
    const topRightY = useSharedValue(0)
    const botLeftX = useSharedValue(0)
    const botLeftY = useSharedValue(0)
    const botRightX = useSharedValue(0)
    const botRightY = useSharedValue(0)

    const vStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
        }
    })

    const tlStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(topLeftX.value),
            height: withTiming(topLeftY.value)
        }
    })

    const trStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(topRightX.value),
            height: withTiming(topRightY.value),
        }
    })

    const blStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(botLeftX.value),
            height: withTiming(botLeftY.value),
        }
    })

    const brStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(botRightX.value),
            height: withTiming(botRightY.value),
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


            //top left
            if (x < 100 && y < 100) {
                topLeftX.value = windowWidth
                topLeftY.value = windowHeight + 500

            }
            //top right
            else if (x > windowWidth - 200 && y < 100) {
                topRightX.value = windowWidth
                topRightY.value = windowHeight + 500
            }
            //bottom left
            else if (x < 100 && y > windowHeight - 200) {
                botLeftX.value = windowWidth
                botLeftY.value = windowHeight + 500
            }
            //bottom right
            else if (x > windowWidth - 200 && y > windowHeight - 200) {
                botRightX.value = windowWidth
                botRightY.value = windowHeight + 500
            }
            else {
                topLeftX.value = 0
                topLeftY.value = 0
                topRightX.value = 0
                topRightY.value = 0
                botLeftX.value = 0
                botLeftY.value = 0
                botRightX.value = 0
                botRightY.value = 0
            }

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
        <AnimatedView  >
            <AnimatedView style={[tlStyle, { backgroundColor: "red", position: "absolute", borderBottomRightRadius: 500 }]} />
            <AnimatedView style={[trStyle, { backgroundColor: "orange", position: "absolute", right: 0, borderBottomLeftRadius: 500 }]} />
            <AnimatedView style={[blStyle, { backgroundColor: "green", position: "absolute", bottom: -windowHeight + 100, borderTopRightRadius: 500 }]} />
            <AnimatedView style={[brStyle, { backgroundColor: "aquamarine", position: "absolute", bottom: -windowHeight + 100, right: 0, borderTopLeftRadius: 500 }]} />
            {/* <AnimatedView style={[bStyle, { backgroundColor: "red", position: "absolute", borderBottomRightRadius: 500 }]} />
            <AnimatedView style={[bStyle, { backgroundColor: "red", position: "absolute", borderBottomRightRadius: 500 }]} /> */}
            <PanGestureHandler onGestureEvent={panGesture}  >
                <AnimatedView style={[vStyle, { height: 100, width: 100, backgroundColor: "blue" }]} />
            </PanGestureHandler>


        </AnimatedView>

    )
}

export default GestureDot
