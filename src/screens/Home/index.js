import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

import {
  Container,
  Title,
  ButtonContainer,
  Button,
  ButtonTitle
} from './styles';

export default function Home() {

  const signOutFunction = () => {
    signOut(auth);
  }

  return (
    <Container>
      <Title>HOME</Title>
      <ButtonContainer>
        <Button onPress={signOutFunction}>
          <ButtonTitle>Deslogar</ButtonTitle>
        </Button>
      </ButtonContainer>
    </Container>
  );
}