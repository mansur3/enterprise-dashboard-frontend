import styled from "styled-components";
import UserForm from "../components/Form";
import useFetch from "../hooks/useFetch";
import { handleCreateUserData } from "../services/index";

const Users = () => {
  const {
    data: users,
    loading,
    error,
  } = useFetch("http://localhost:2233/api/v1/users");

  const handleSubmit = async (userData) => {
    const body = {
      name: userData.name,
      email: userData.email,
    };
    const data = await handleCreateUserData(
      "http://localhost:2233/api/v1/users",
      body
    );
    users.push(data?.data);
    // Implement user creation API call
  };

  return (
    <UsersContainer>
      <h2>User Management</h2>

      <UserForm onSubmit={handleSubmit} />

      {loading && <p>Loading users...</p>}

      <UserList>
        {users?.map((user) => (
          <UserItem key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </UserItem>
        ))}
      </UserList>
    </UsersContainer>
  );
};

const UsersContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const UserList = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
`;

const UserItem = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

export default Users;
