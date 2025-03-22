import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen, user } = useAppContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Wrapper>
      <Sidebar />
      <MainContent sidebarOpen={sidebarOpen}>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "250px" : "0")};
  transition: margin 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  padding: 2rem;
`;

export default Layout;
