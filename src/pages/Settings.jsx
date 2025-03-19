import styled from "styled-components";

const Settings = () => {
  return (
    <SettingsContainer>
      <h2>Settings</h2>
      <SettingsGroup>
        <h3>General Settings</h3>
        <SettingItem>
          <label>Notifications</label>
          <select>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </SettingItem>
      </SettingsGroup>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SettingsGroup = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export default Settings;
