import React from "react";
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";

import {
  Container,
  Content,
  Title,
  Massage,
  Footer,
} from './styles'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

export function SchedulingComplete() {
  const {width} = useWindowDimensions();
  return(
    <Container>
      <LogoSvg width={width}/>

      <Content>
         <DoneSvg width={80} height={80}/>
         <Title>Carro alugado !</Title>

         <Massage>
           Agora você só precisa ir {'\n'}
           até a concessionária da RENTS {'\n'}
           pegar o seu autómovel
         </Massage>
      </Content>

      <Footer>
        <ConfirmButton  title={'Ok'}/>
      </Footer>

    </Container>
  )
}