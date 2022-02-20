import styled from 'styled-components';
import { IoIosClose, IoIosSettings } from 'react-icons/io';
import { SidebarButton, ICON_SIZE } from './Sidebar';

type SettingsMenuProps = {
    close: any,
  }
  
const SettingsMenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const STHeader = styled.div`
    width: 90%;
    font-size: 2.5vw;
    font-family: monospace;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`

const STSaveButton = styled.button`
  width: 80%;
  outline: none;
  height: auto;
  background: #000;
  font-size: 1.5vw;
  color: white;
  font-family: "Helvetica";
  text-align: center;
  padding: 15px;
  border: none;
  border-radius: 10px;
  border: solid 1px #2c2c2c;
  cursor: pointer;

  transition-duration: 200ms;

  &:hover {
    transform: scale(1.1);
    background-image: linear-gradient(transparent, transparent), radial-gradient(circle at top left, #f00,#3020ff);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border: none;
  }

  &:disabled {
      opacity: 0.2;
      pointer-events: none;
  }

  &:active {
    opacity: 0.75;
  }
`

const Settings = ({ close } : SettingsMenuProps) => {
    return (
        <>
        <SidebarButton onClick={close}>
            <IoIosClose size={ICON_SIZE}/>
        </SidebarButton>
        <SettingsMenuContainer>
            <STHeader>
                Settings
                <IoIosSettings size={ICON_SIZE} style={{marginLeft: 8}}/>
            </STHeader>
            <STSaveButton>
                Save Changes
            </STSaveButton>
        </SettingsMenuContainer>
        </>
    )
}

export default Settings