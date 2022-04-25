import React from "react";
import { useWindowDimensions, StatusBar } from "react-native";
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
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";


export function SchedulingComplete() {
  const {width} = useWindowDimensions();

 const navigation = useNavigation<NavigationProp<ParamListBase>>()

function handleCofirm () {
  navigation.navigate('Home')
}


  return(
    <Container>
      <StatusBar 
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
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
        <ConfirmButton  title={'Ok'} onPress={handleCofirm}/>
      </Footer>

    </Container>
  )
}