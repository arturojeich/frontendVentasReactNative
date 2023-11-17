import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenType } from '../utilities/ScreenType'
import { CustomStyles } from '../customStyles/CustomStyles'

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  })

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity }
  }
}

const Stack = createStackNavigator()

function MyStack({ listScreens }) {
  const screens = listScreens.map(({ key }) => {
    return (
      <Stack.Screen
        key={key}
        name={screenType[key].name}
        component={screenType[key].location.default}
        options={{
          headerTintColor: CustomStyles.colors.mainText,
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center'
        }}
      />
    )
  })
  return <Stack.Navigator>{screens}</Stack.Navigator>
}

export default MyStack
