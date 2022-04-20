import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/imageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

import {Feather} from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

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




export function SchedulingDetails () {
  const theme = useTheme()
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

      <Content>
        <Details>
          <Description>
            <Brande>Lamborghini</Brande>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name="380km/h" icon={speedSvg}/>
          <Accessory name="3.2s" icon={accelerationSvg}/>
          <Accessory name="800 HP" icon={forceSvg}/>
          <Accessory name="Gasolina" icon={gasolineSvg}/>
          <Accessory name="Auto" icon={exchangeSvg}/>
          <Accessory name="2 pessoas" icon={peopleSvg}/>
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
              <DateValue>18/06/2021</DateValue>
            </DateInfo>
        
          <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.shape}
              />
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
        
        <RentalPrice>
        <RentalPriceLabel>Total</RentalPriceLabel>
        </RentalPrice>
        <RentalPriceDetails>
          <RentalPriceTotalQuota>R$ 580 +3 diárias</RentalPriceTotalQuota>
          <RentalPriceTotal>R$2.900</RentalPriceTotal>
        </RentalPriceDetails>
      </Content>
      
      <Footer>
        <Button title="Alugar agora" color={theme.colors.success}/>
      </Footer>
    </Container>
  )
}