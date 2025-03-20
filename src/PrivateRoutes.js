import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Layout = () => {
  const navigate = useNavigate();
  const { sidebarOpen, user } = useAppContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Content>
      <Outlet />
    </Content>
  );
};

const Content = styled.div`
  padding: 2rem;
`;

export default Layout;
