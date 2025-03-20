import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const UserForm = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(initialData || { name: "", email: "" });
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          {...register("name", { required: "Name is required" })}
          error={errors.name}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormGroup>

      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          error={errors.email}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </FormGroup>
      <ButtonsContainer>
        <SubmitButton type="submit">
          {initialData ? "Update User" : "Save User"}
        </SubmitButton>
        <ResetButton type="button" onClick={() => reset()}>
          Reset Form
        </ResetButton>
        {initialData && (
          <CancelButton type="button" onClick={onCancel}>
            Cancel Edit
          </CancelButton>
        )}
      </ButtonsContainer>

      {/* <SubmitButton type="submit">Save User</SubmitButton>
      <ResetButton type="button" onClick={() => reset()}>
        Reset Form
      </ResetButton> */}
    </FormWrapper>
  );
};

// Styled components
const FormWrapper = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid
    ${({ error, theme }) => (error ? theme.error : theme.border)};
  border-radius: 4px;
`;

const Error = styled.span`
  color: ${({ theme }) => theme.error};
  font-size: 0.875rem;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: ${({ theme }) => theme.error};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default UserForm;
