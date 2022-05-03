import React, {useEffect} from "react";

import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/core";

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'


import Animated, 
{useSharedValue, 
useAnimatedStyle,
withTiming,
interpolate,
Extrapolate,
runOnJS
} from "react-native-reanimated";

import {
  Container
} from './style'




export function Splash () {
  const splashAnimation = useSharedValue(0)

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,[0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, 
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ] 
    }
  });
  
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity:  interpolate(splashAnimation.value,[0, 25, 50],[0, .3, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming( 
      50,
      { duration: 2000},
      () => {
        'worklet'
        runOnJS(startApp)()
        
      }
      );
  }, [])

  return(
    <Container>
     <Animated.View  style={[brandStyle, {position: 'absolute'}]}>
       <BrandSvg  widht={80} height={45}/>
     </Animated.View>

     <Animated.View style={[logoStyle, {position: 'absolute'}]}>
       <LogoSvg widht={180} height={40}/>
     </Animated.View>
    </Container>
  );
}
