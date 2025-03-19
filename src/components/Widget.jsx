import styled from "styled-components";

const Widget = ({ title, children }) => {
  console.log("Welcome to the world widtget");
  return (
    <WidgetWrapper>
      <WidgetTitle>{title}</WidgetTitle>
      <WidgetContent>{children}</WidgetContent>
    </WidgetWrapper>
  );
};

const WidgetWrapper = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const WidgetTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary};
`;

const WidgetContent = styled.div`
  min-height: 300px;
`;

export default Widget;
