import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/imageSlider";

import {
Container,
Header,
CardImages
} from './styles'

export function CarDetails () {
  return(
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CardImages>
        <ImageSlider 
          imagesUrl={['https://www.carliveryauto.com/wp-content/uploads/2020/01/1845987-audi-audi-png-2100_1386.png']}
        />
      </CardImages>
    </Container>
  )
}