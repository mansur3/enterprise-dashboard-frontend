import styled from "styled-components";
import UserForm from "../components/Form";
import useFetch from "../hooks/useFetch";
import {
  handleCreateUserData,
  handleGetUserData,
  handleUpdateUserData,
  handleDeleteUserData,
} from "../services/index";
import { useEffect, useState } from "react";

const Users = () => {
  const { data: users, loading, error } = useFetch("/users");

  const [usersList, setUserList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(usersList.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = usersList.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [usersList, currentPage, totalPages]);

  const handleSubmit = async (userData) => {
    try {
      let data;
      const body = {
        name: userData.name,
        email: userData.email,
      };
      if (editingUser) {
        data = await handleUpdateUserData(`/users/${editingUser.id}`, body);
      } else {
        data = await handleCreateUserData("/users", body);
      }

      if (data?.data) {
        const getUsers = await handleGetUserData("/users");
        console.log(data, getUsers);
        setUserList(getUsers?.data ?? []);
        setEditingUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await handleDeleteUserData(`/users/${userId}`);
      const getUsers = await handleGetUserData("/users");
      setUserList(getUsers?.data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (users) {
      setUserList(users);
    }
  }, [users]);

  return (
    <UsersContainer>
      <h2>User Management</h2>

      <UserForm
        initialData={editingUser} // Pass the user being edited
        onCancel={() => setEditingUser(null)}
        onSubmit={handleSubmit}
      />

      {loading && <p>Loading users...</p>}

      <UserList>
        {currentUsers?.map((user) => (
          <UserItem key={user.id}>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <Actions>
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </Actions>
          </UserItem>
        ))}
      </UserList>
      {usersList.length > 0 && (
        <PaginationContainer>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}>
              Next
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}>
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
          </select>
        </PaginationContainer>
      )}
    </UsersContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.backgroundLight};
  border-radius: 4px;

  button {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 4px;
    background: ${({ theme }) => theme.background};
    cursor: pointer;

    &:disabled {
      background: ${({ theme }) => theme.disabled};
      cursor: not-allowed;
    }
  }

  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background: #fff;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

export default Users;
