import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const navItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/users", label: "Users", icon: FiUsers },
    { path: "/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <Wrapper sidebarOpen={sidebarOpen}>
      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.label}
          onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}>
          <item.icon />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 250px;
  position: fixed;
  height: 100vh;
  background: ${({ theme }) => theme.sidebar};
  padding: 1rem;
  transition: transform 0.3s ease;
  transform: ${({ sidebarOpen }) =>
    sidebarOpen ? "translateX(0)" : "translateX(-100%)"};

  a {
    display: flex;
    align-items: center;
    padding: 1rem;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    border-radius: 4px;
    margin-bottom: 0.5rem;

    &:hover {
      background: ${({ theme }) => theme.hover};
    }

    &.active {
      background: ${({ theme }) => theme.primary};
      color: white;
    }

    svg {
      margin-right: 1rem;
    }
  }

  @media (max-width: 768px) {
    transform: ${({ sidebarOpen }) =>
      sidebarOpen ? "translateX(0)" : "translateX(-100%)"};
    z-index: 1000;
    width: 200px;
  }
`;

export default Sidebar;
