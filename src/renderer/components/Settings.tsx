import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { IoIosClose, IoIosSettings } from 'react-icons/io';
import { SidebarButton, ICON_SIZE } from './Sidebar';

type SettingsMenuProps = {
    close: any,
    isOpen: boolean,
}

const SETTINGS_FONT_SIZE = `max(1.5vmax, 1em)`
const SETTINGS_TITLE_FONT_SIZE = `max(2.5vmax, 1.5em)`
  
const SettingsMenuContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const STHeader = styled.div`
    width: 90%;
    font-size: ${SETTINGS_TITLE_FONT_SIZE};
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
  font-size: ${SETTINGS_FONT_SIZE};
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

const STSetting = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const STLabel = styled.div`
  color: white;
  text-align: center;
  font-size: ${SETTINGS_FONT_SIZE};
  width: 100%;
  margin-bottom: 5px;
`

const Input = styled.input`
    background-color: #2c2c2c;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: #AEAEAE;
    font-size: calc(${SETTINGS_FONT_SIZE} - 3px);
    width: 90%;
`

const Settings = ({ close, isOpen } : SettingsMenuProps) => {

    const [storedSettings, setStoredSettings] = useState({kindleAddress: "", fromAddress: "", fromPW: ""});
    const [kindleAddress, setKindleAddress] = useState("");
    const [fromAddress, setFromAddress] = useState("");
    const [fromPW, setFromPW] = useState("");
    const [settingsHaveChanged, setSettingsHaveChanged] = useState(false);

    useEffect(() => {
        (async () => {
            const storedKindleAddress = await window.electron.store.get('kindleAddress');
            const storedFromAddress = await window.electron.store.get('fromAddress');
            const storedFromPW = await window.electron.store.get('fromPW');

            setKindleAddress(storedKindleAddress);
            setFromAddress(storedFromAddress);
            setFromPW(storedFromPW);

            const obj = {
                kindleAddress: storedKindleAddress ?? "",
                fromAddress: storedFromAddress ?? "",
                fromPW: storedFromPW ?? ""
            }

            setStoredSettings(obj)
        })();
    }, [])

    useEffect(() => {
        if (!storedSettings.kindleAddress || !storedSettings.fromAddress || !storedSettings.fromPW) return;
        setSettingsHaveChanged(!((kindleAddress == storedSettings.kindleAddress) && (fromAddress == storedSettings.fromAddress) && (fromPW == storedSettings.fromPW)))
    }, [kindleAddress, fromAddress, fromPW])

    const SaveSettings = () => {
        let oldSettings = storedSettings;

        window.electron.store.set('kindleAddress', kindleAddress)
        window.electron.store.set('fromAddress', fromAddress)
        window.electron.store.set('fromPW', fromPW)

        oldSettings.kindleAddress = kindleAddress;
        oldSettings.fromAddress = fromAddress;
        oldSettings.fromPW = fromPW;
        setStoredSettings(oldSettings);
        setSettingsHaveChanged(false);
    }

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
            {isOpen && (
                <>
                    <STSetting>
                        <STLabel>Kindle Address</STLabel>
                        <Input type="text" defaultValue={storedSettings.kindleAddress} onChange={(event) => {setKindleAddress(event.target.value)}}/>
                    </STSetting>

                    <STSetting>
                        <STLabel>Email From</STLabel>
                        <Input type="text" defaultValue={storedSettings.fromAddress} onChange={(event) => {setFromAddress(event.target.value)}}/>
                    </STSetting>

                    <STSetting>
                        <STLabel>Email PW</STLabel>
                        <Input type="password" defaultValue={storedSettings.fromPW} onChange={(event) => {setFromPW(event.target.value)}}/>
                    </STSetting>
                </>
            )}

            <STSaveButton disabled={!settingsHaveChanged} onClick={SaveSettings}>
                Save Changes
            </STSaveButton>
        </SettingsMenuContainer>
        </>
    )
}

export default Settings