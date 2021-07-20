import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { $authUser } from '@brunhild/entities/user/auth';
import { paths } from '../paths';
import { loginChanged, loginFormSubmit, passwordChanged } from './formModel';

const Form = styled.form``;

const Field = styled.div`
  margin: 10px 0;
`;

const Container = styled.div`
  max-width: 300px;
  margin: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export function LoginPage() {
  const history = useHistory();
  const user = useStore($authUser);

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginFormSubmit();
  };

  React.useEffect(() => {
    if (user) {
      history.push(paths.home());
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={(e) => handleLoginFormSubmit(e)}>
        <Field>
          <TextField
            autoComplete="false"
            label="Login"
            fullWidth
            onChange={(e) => loginChanged(e.target.value)}
          />
        </Field>
        <Field>
          <TextField
            autoComplete="false"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => passwordChanged(e.target.value)}
          />
        </Field>
        <ButtonsContainer>
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button type="button">Reset</Button>
        </ButtonsContainer>
      </Form>
    </Container>
  );
}
