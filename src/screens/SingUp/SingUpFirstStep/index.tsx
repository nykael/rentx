import React from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles'

export function SingUpFirstStep () {
  const navigation = useNavigation()

  function handleBack() {
      navigation.goBack()
  }

    return(
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <BackButton onPress={handleBack}/>
              <Steps>
                <Bullet active/>
                <Bullet />
              </Steps>
            </Header> 

            <Title>
             Crie sua {'\n'}conta
            </Title>

            <Subtitle>
             Faça seu cadastro de {'\n'}
             forma rápida e fácil
            </Subtitle>

            <Form>
              <FormTitle>1. Dados</FormTitle>
              <Input 
               iconName="user" 
               placeholder="Name"
              />

              <Input 
               iconName="mail"  
               placeholder="E-mail"
              />

              <Input 
               iconName="credit-card" 
               placeholder="CNH"
              /> 
            </Form>
              
            <Button 
             title="Próximo" 
             onPress={() => {}}
            />

          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}