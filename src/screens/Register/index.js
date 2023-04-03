
import {
  Container,
  Title,
  Input,
  ButtonContainer,
  Button,
  ButtonTitle
} from './styles';

export default function Register() {
  return (
    <Container>
      <Title>Registrar</Title>
      <Input
        placeholder="E-mail"
      />
      <Input
        placeholder="Senha"
      />
      <ButtonContainer>
        <Button>
          <ButtonTitle>Registrar</ButtonTitle>
        </Button>
      </ButtonContainer>
    </Container>
  );
}