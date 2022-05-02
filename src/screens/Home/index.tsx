import { useNavigation, ParamListBase, NavigationProp } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { StatusBar} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import {api} from '../../services/api'
import {CarDTO} from '../../dtos/CarDTO'

import { Car } from "../../components/car";
import { Load} from "../../components/Load";

import { 
  CarList,
  Container, 
  Header,
  HeaderContent,
  TotalCars,
  MycarsButton
} from "./styles";
import { useTheme } from "styled-components";

export function Home () {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const theme = useTheme()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {car})
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
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
          <TotalCars>
          Total de 12 carros
          </TotalCars>
       </HeaderContent>
      </Header>
      {loading ? <Load /> : 
        <CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Car data={item}
        onPress={() => handleCarDetails(item)}
        />}
      />
      }

      <MycarsButton onPress={handleOpenMyCars} >
        <Ionicons 
        name="car-sport"
        size={32}
        color={theme.colors.shape}
        />
      </MycarsButton>
      
    </Container>
  )
}