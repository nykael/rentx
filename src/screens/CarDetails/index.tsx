import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/imageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'

import {
Container,
Header,
CardImages,
Content,
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

interface Params{
  car: CarDTO
}

export function CarDetails () {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const rout = useRoute()
  const {car} = rout.params as Params

  function handleConfirmRental () {
    navigation.navigate('Scheduling', {car})
  }

  function handleBack () {
    navigation.goBack()
  }

  return(
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CardImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CardImages>

      <Content>
        <Details>
          <Description>
            <Brande>{car.brand}</Brande>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period> {car.rent.period} </Period>
            <Price> R$ {car.rent.price} </Price>
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

        <About> {car.about} </About>
      </Content>
      
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}