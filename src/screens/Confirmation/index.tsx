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
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}


export function Confirmation() {
  const {width} = useWindowDimensions();
  const route = useRoute()

  const {title, message, nextScreenRoute} = route.params as Params;

 const navigation = useNavigation<NavigationProp<ParamListBase>>()

function handleCofirm () {
  navigation.navigate(nextScreenRoute)
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
         <Title>{title}</Title>

         <Massage>{message}</Massage>
      </Content>

      <Footer>
        <ConfirmButton  title={'Ok'} onPress={handleCofirm}/>
      </Footer>

    </Container>
  )
}