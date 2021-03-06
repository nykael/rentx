import React, {useState} from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import {useAuth} from '../../hooks/auth'
import { useTheme } from 'styled-components';

import {Button} from '../../components/Button'

import { Input } from '../../components/Input';
import {PasswordInput } from '../../components/PasswordInput';
 

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Form,
    Footer
} from './styles'

import * as Yup from 'yup'
import { SingUpFirstStep } from '../SingUp/SingUpFirstStep';

export function Signin () {
 const theme = useTheme()
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

 const navigation = useNavigation<NavigationProp<ParamListBase>>()
 const {signIn} = useAuth()


 async function handleSingIn () {
  try {
    const schema = Yup.object().shape({
      password: Yup.string()
      .required('A senha é Obrigatória'),
      email: Yup.string()
       .required('E-mail obrigatório')
       .email('Digite um e-mail válido'),
     
    });
  
    await schema.validate({email, password})
    Alert.alert('Tudo certo !')


    signIn({email, password});
  } catch (error) {
    if(error instanceof Yup.ValidationError) {
      Alert.alert('Opa', error.message)
    }else{
      Alert.alert('Error na autenticação', 
      'Ocorreu um erro ao fazer login, verfique as credenciais'
      )
    }
  }
 }

 function handleNewAcount() {
  navigation.navigate('SingUpFirstStep')
 }

    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
              <StatusBar 
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
              />
            <Header>
                <Title> 
                Estamos {'\n'}quase lá    
                </Title>   
                <Subtitle>
                    Faça seu login para começar {'\n'}
                    uma experiência incrivel
                </Subtitle>
            </Header> 

            <Form>
              <Input 
              iconName="mail"
              placeholder='E-mail'
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
              />
              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                onChangeText={setPassword}
                value={password}
              />
            </Form>
              
              <Footer>
                <Button 
                  title='Login'
                  onPress={handleSingIn}
                  loading={false}
                />

                <Button 
                  title='Criar conta gratuita'
                  onPress={ handleNewAcount}
                  loading={false}
                  color={theme.colors.backgorund_secondary}
                  light
                />    
              </Footer>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>  
    )
}