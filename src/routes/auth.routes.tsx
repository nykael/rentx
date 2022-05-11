import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Confirmation} from '../screens/Confirmation'
import {Splash} from '../screens/Splash'
import {Signin} from '../screens/Signin'
import {SingUpFirstStep} from '../screens/SingUp/SingUpFirstStep'
import {SingUpSecondStep} from '../screens/SingUp/SingUpSecondStep '

const {Navigator, Screen} = createNativeStackNavigator();

export function AutRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}  initialRouteName="Splash">
      <Screen 
        name="Splash"
        component={Splash}
      />
      <Screen 
        name="Signin"
        component={Signin}
      />
      <Screen 
        name="SingUpFirstStep"
        component={SingUpFirstStep}
      />
      <Screen 
        name="SingUpSecondStep"
        component={SingUpSecondStep}
      />
      <Screen 
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}