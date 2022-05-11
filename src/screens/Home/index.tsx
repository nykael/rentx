import { useNavigation, ParamListBase, NavigationProp } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { StatusBar} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import {api} from '../../services/api'
import {CarDTO} from '../../dtos/CarDTO'


import { Car } from "../../components/car";
import {LoadAnimation} from "../../components/LoadAnimation";

import { 
  CarList,
  Container, 
  Header,
  HeaderContent,
  TotalCars,
} from "./styles";


export function Home () {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {car})
  }



  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }
    fetchCars()
  },[])

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
          { ! loading  &&
          <TotalCars>
          Total de {cars.length} carros
          </TotalCars>

          }
       </HeaderContent>
      </Header>
      {loading ? <LoadAnimation/> : 
        <CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Car data={item}
        onPress={() => handleCarDetails(item)}
        />}
      />
      } 
    </Container>
  )
}
