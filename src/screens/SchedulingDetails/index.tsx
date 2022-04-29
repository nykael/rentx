import React, { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/imageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import{ getAccessoryIcon } from '../../utils/getAccessoryIcon'

import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { format } from "date-fns";
import { getPlataformDate } from "../../utils/getPlatformDate";

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
Accessories,
Footer,
RentalPeriod,
CalendarIcon,
DateInfo,
DateTitle,
DateValue,
RentalPrice,
RentalPriceLabel,
RentalPriceDetails,
RentalPriceTotalQuota,
RentalPriceTotal
} from './styles'
import { api } from "../../services/api";
import { Alert } from "react-native";

interface Params{
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod{
  start: string;
  end: string;
}

export function SchedulingDetails () {
 const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  
 const theme = useTheme()
 const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const rout = useRoute()
 const {car, dates} = rout.params as Params

 const rentTotal = Number(dates.length * car.rent.price)
 
 async function handleConfirmRental() {
   const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

   const unavailable_dates = [
     ...schedulesByCar.data.unavailable_dates,
     ...dates,
   ];

    api.put(`/schedules_bycars/${car.id}`, {
     id: car.id,
     unavailable_dates
   })
   .then( () => navigation.navigate('SchedulingComplete'))
   .catch(() => Alert.alert('Não foi possível confirmar o agendamento.'))
  
 }

 function handleBack () {
  navigation.goBack()
}

useEffect(() => {
  setRentalPeriod({
     start: format(getPlataformDate(new Date(dates[0])), 'dd/mm/yyyy'),
     end: format(getPlataformDate(new Date(dates[dates.length -1])), 'dd/mm/yyyy')
  })
}, [])

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
            <Brande> {car.brand} </Brande>
            <Name> {car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            car.accessories.map(acessory => (
              <Accessory 
              key={acessory.type}
              name={acessory.name} 
              icon={getAccessoryIcon(acessory.type)}/>
            ))
          }
        </Accessories>

        <RentalPeriod>

            <CalendarIcon>
              <Feather 
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>De</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>
        
          <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.shape}
              />
          <DateInfo>
            <DateTitle>até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        
        <RentalPrice>
        <RentalPriceLabel>Total</RentalPriceLabel>
        </RentalPrice>
        <RentalPriceDetails>
          <RentalPriceTotalQuota>{`R$ ${car.rent.price} x ${dates.length} diárias`}</RentalPriceTotalQuota>
          <RentalPriceTotal>R${rentTotal}</RentalPriceTotal>
        </RentalPriceDetails>
      </Content>
      
      <Footer>
         <Button title="Alugar agora" color={theme.colors.success}
         onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  )
}