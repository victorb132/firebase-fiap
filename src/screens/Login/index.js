import { useState } from 'react';
import {
  Container,
  Title,
  Input,
  ButtonContainer,
  Button,
  ButtonTitle
} from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Title>FIAP</Title>
      <Input
        placeholder="E-mail"
        type="text"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Senha"
        secureTextEntry={true}
        type="text"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <ButtonContainer>
        <Button>
          <ButtonTitle>Logar</ButtonTitle>
        </Button>
        <Button>
          <ButtonTitle>Registrar</ButtonTitle>
        </Button>
      </ButtonContainer>
    </Container>
  );
}