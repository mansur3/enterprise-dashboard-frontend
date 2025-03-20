import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";
import Loader from "../components/Loader";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login, loading, error, user } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit}>
        <h2>Enterprise Login</h2>

        <Input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        {error && <Error>{error}</Error>}

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Login"}
        </Button>
        <SignupPrompt>
          Don't have an account yet?{" "}
          <SignupLink href="/signup">Sign up</SignupLink>
        </SignupPrompt>
      </Form>
    </LoginWrapper>
  );
};

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Error = styled.div`
  color: ${({ theme }) => theme.error};
  margin-bottom: 1rem;
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
`;

const SignupLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
