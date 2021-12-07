import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import {
  View,
} from 'react-native';
import GestureDot from './src/Gesture/GestureDot';
import CircleProgress from './src/Svg/CircleProgress'
import Bar from './src/Svg/Bar'
import Home from './src/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()



export const screen = [
  {
    component: Home,
    title: "Home"
  }, {
    component: GestureDot,
    title: "GestureDot"
  }, {
    component: CircleProgress,
    title: "CircleProgress"
  }, {
    component: Bar,
    title: "Bar"
  },
]

const SCREEN = () => {
  return screen.map(val => {
    return <Stack.Screen name={val.title} component={val.component} />
  })

}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'} >
        {SCREEN()}
      </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
