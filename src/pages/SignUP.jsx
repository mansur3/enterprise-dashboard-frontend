import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";
import Loader from "../components/Loader";
import { useEffect } from "react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { signup, user, loading, error } = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <SignupWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Enterprise Signup</h2>

        <Input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
        />
        {errors.name && <Error>{errors.name.message}</Error>}

        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
        />
        {errors.email && <Error>{errors.email.message}</Error>}

        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={!!errors.password}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <Error>{errors.confirmPassword.message}</Error>
        )}

        {error && <Error>{error}</Error>}

        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Create Account"}
        </Button>

        <LoginPrompt>
          Already have an account? <LoginLink href="/login">Login</LoginLink>
        </LoginPrompt>
      </Form>
    </SignupWrapper>
  );
};

// Styled components (updated with error styling)
const SignupWrapper = styled.div`
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
  margin-bottom: 0.5rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.error : "#ddd")};
  border-radius: 4px;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
`;

const LoginLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export default Signup;
