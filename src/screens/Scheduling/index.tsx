import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";

import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { 
Calendar, 
DayProps, 
generateInterval, 
MarkedDateProps,

} from "../../components/Calendar";

import { 
NavigationProp,
ParamListBase, 
useNavigation,
useRoute, 
} from "@react-navigation/native";


import ArrowSvg from '../../assets/arrow.svg'
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles'
import { format } from "date-fns";
import { getPlataformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params{
  car: CarDTO
}

export function Scheduling () {
 const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
 const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
 const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
 const rout = useRoute()
 const {car} = rout.params as Params

 const theme = useTheme()
 const navigation = useNavigation<NavigationProp<ParamListBase>>()
 

  function handleConfirmRental() {
    if(!rentalPeriod.startFormatted || ! rentalPeriod.endFormatted){
      Alert.alert('Selecione o intervalo para alugar')
    }else{
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    })
    }
  }

  function handleBack () {
    navigation.goBack()
  }

  function handleChangeDate(date:DayProps) { 
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if ( start.timestamp > end.timestamp){
        start = end;
        end = start;
    }


    setLastSelectedDate(end)
    const interval = generateInterval(start,end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/mm/yyyy'),
      endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/mm/yyyy')
    })
  }
  
  return(
    <Container>
      <Header>
      <StatusBar 
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        <BackButton 
        onPress={handleBack}
        color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel {'\n'}
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
         <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}