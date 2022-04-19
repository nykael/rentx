import React from "react";
import {StatusBar} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from "../../components/car";

import { 
  CarList,
  Container, 
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";

export function Home () {
  const carData = {
  brand: 'audi',
  name: 'RS 5 coupé',
  rent: {
    period:'AO DIA',
    price: 120,
  },
  thumbnail: 'https://www.carliveryauto.com/wp-content/uploads/2020/01/1845987-audi-audi-png-2100_1386.png'
  }
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
      <CarList 
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({item}) => <Car data={carData}/>}
      />
    </Container>
  )
}