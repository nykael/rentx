import React from "react";
import {StatusBar} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { 
  Container, 
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

export function Home () {
  return(
    <Container>
      <Header>
       <HeaderContent>
          <StatusBar 
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <Logo 
          widht={RFValue(108)}
          height={RFValue(12)}
          />
          <TotalCars>
          Total de 12 carros
          </TotalCars>
       </HeaderContent>
      </Header>
    </Container>
  )
}