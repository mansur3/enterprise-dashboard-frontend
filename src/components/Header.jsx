import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { sidebarOpen, setSidebarOpen, user, logout } = useAppContext();

  return (
    <HeaderWrapper>
      <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FiMenu />
      </MenuButton>

      <HeaderTitle>Enterprise Dashboard</HeaderTitle>

      <UserSection>
        {user && (
          <UserInfo>
            <span>Welcome, {user.name}</span>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </UserInfo>
        )}
      </UserSection>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const UserSection = styled.div`
  margin-left: auto;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

export default Header;
