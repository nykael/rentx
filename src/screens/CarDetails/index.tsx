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

        <About>
          Este é um automóvel desportivo.  Surgiu do lendário
          touro de lide indultado na praça Real Maestranza da Sevilla.
          É um belíssimo carro pra quem gosta de acelerar.
        </About>
      </Content>
      
      <Footer>
        <Button title="Confirmar"/>
      </Footer>
    </Container>
  )
}