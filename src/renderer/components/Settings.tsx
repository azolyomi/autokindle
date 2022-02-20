import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { SidebarButton, ICON_SIZE } from './Sidebar';

type SettingsMenuProps = {
    close: any,
  }
  
const SettingsMenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`

const Settings = ({ close } : SettingsMenuProps) => {
    return (
        <>
        <SidebarButton onClick={close}>
            <IoIosClose size={ICON_SIZE}/>
        </SidebarButton>
        <SettingsMenuContainer>

        </SettingsMenuContainer>
        </>
    )
}

export default Settings