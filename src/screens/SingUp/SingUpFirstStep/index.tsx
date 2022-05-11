import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import * as Yup from 'yup'

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles'
import { useAuth } from "../../../hooks/auth";

export function SingUpFirstStep () {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [drivelicense, setDriverLicense] = useState('')

  const {user} = useAuth()

  async function handleNextScreenshot() {

    try {  
      const schema = Yup.object().shape({
      drivelicense: Yup.string()
      .required('CNH é obrigatória'),  
      email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
      name: Yup.string()
      .required('Nome é obrigatório'),
      
    });

      const data = {name, email, drivelicense}
      await schema.validate(data)
      
      navigation.navigate('SingUpSecondStep', {user: data})
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }
      
    }
  }


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
               onChangeText={setName}
               value={name}
              />

              <Input 
               iconName="mail"  
               placeholder="E-mail"
               onChangeText={setEmail}
               value={email}
              />

              <Input 
               iconName="credit-card" 
               placeholder="CNH"
               onChangeText={setDriverLicense}
               value={drivelicense}
              /> 
            </Form>
              
            <Button 
             title="Próximo" 
             onPress={handleNextScreenshot}
            />

          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}