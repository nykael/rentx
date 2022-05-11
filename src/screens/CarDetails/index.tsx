import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/imageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from "react-native-reanimated";

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'

import {
Container,
Header,
CardImages,
Details,
Description,
Brande,
Name,
Rent,
Period,
Price,
About,
Accessories,
Footer,
} from './styles'


import theme from "../../styles/theme";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar, StyleSheet } from "react-native";

interface Params{
  car: CarDTO
}

export function CarDetails () {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const rout = useRoute()
  const {car} = rout.params as Params

  const scrollY = useSharedValue(0)
  const scrollHandle = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
    console.log(event.contentOffset.y)
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value, 
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value, [0, 150], [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleConfirmRental () {
    navigation.navigate('Scheduling', {car})
  }

  function handleBack () {
    navigation.goBack()
  }

  return(
    <Container>
      <StatusBar 
        barStyle={"dark-content"}
        translucent
        backgroundColor="transparent"
      />
  
      <Animated.View
        style={[
          headerStyleAnimation,  
          styles.header,
          {
            backgroundColor: theme.colors.backgorund_secondary
          }
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

          <CardImages>
        <Animated.View style={sliderCarsStyleAnimation}>
            <ImageSlider 
              imagesUrl={car.photos}
            />
        </Animated.View>
          </CardImages>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brande>{car.brand}</Brande>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period> {car.period} </Period>
            <Price> R$ {car.price} </Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}/>
            ))
          }
        </Accessories>

        <About> 
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position:'absolute',
    overflow:'hidden',
    zIndex: 1,
  }
})