import { useNavigation, ParamListBase, NavigationProp } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { StatusBar} from 'react-native'
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
} from "./styles";

export function Home () {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const carData = {
  brand: 'audi',
  name: 'RS 5 coupé',
  rent: {
    period:'AO DIA',
    price: 120,
  },
  thumbnail: 'https://www.carliveryauto.com/wp-content/uploads/2020/01/1845987-audi-audi-png-2100_1386.png'
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails')
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
        onPress={handleCarDetails}
        />}
      />
      }
      
    </Container>
  )
}