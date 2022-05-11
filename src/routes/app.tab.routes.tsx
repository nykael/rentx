import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import HomeSvg from "../assets/home.svg"
import CarSvg from "../assets/car.svg"
import PeopleSvg from "../assets/people.svg"

import {AppStackRoutes} from './app.stack.routes'
import {Home} from '../screens/Home'
import {MyCars} from '../screens/MyCars'
import { Platform } from "react-native";
import { useTheme } from "styled-components";
const {Navigator, Screen} = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme()
  return(
    <Navigator 
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 78,
        paddingVertical: Platform.OS ==='ios' ? 20 : 0,
        backgroundColor: theme.colors.backgorund_primary
      },
      tabBarActiveTintColor: theme.colors.main,
      tabBarInactiveTintColor: theme.colors.text_detail
    }}
  
    >
      <Screen 
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ focused, color}) =>(
            <HomeSvg  widht={24} height={24} fill={color} />
          )
        }}
      />
      <Screen 
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color}) =>(
            <PeopleSvg  widht={24} height={24} fill={color} />
          )
        }}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ focused, color}) =>(
            <CarSvg  widht={24} height={24} fill={color} />
          )
        }}
      />
    </Navigator>
  )
}