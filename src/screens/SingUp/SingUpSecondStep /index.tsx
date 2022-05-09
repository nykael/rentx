import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";

import { useTheme } from "styled-components";

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles'

interface Params {
  user: {
    name: string; 
    email:string;
    drivelicense: string;
  }
}

export function SingUpSecondStep  () {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')


  const theme = useTheme()
  const route = useRoute()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const {user} = route.params as Params;


  function handleRegister() {
    if(!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação')
    }

    if(password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
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
                <Bullet />
                <Bullet active/>
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
              <FormTitle>2. Senha</FormTitle>
              <PasswordInput 
                iconName="lock"
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
              />

              <PasswordInput 
                iconName="lock"
                placeholder="Repetir senha"
                onChangeText={setPasswordConfirm}
                value = {passwordConfirm}
              />
            </Form>
              
            <Button 
             title="Cadastrar" 
             color={theme.colors.success}
             onPress={handleRegister}
            />

          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}