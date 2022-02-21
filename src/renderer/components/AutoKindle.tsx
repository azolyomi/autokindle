import styled from 'styled-components';
import { useState } from 'react';
import { ipcMain } from 'electron';

const AK_FONT_SIZE = `max(1.5vmax, 1em)`

const Container = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BookSelector = styled.input`
    outline: none;
    border: none;
    background-color: #0d0d0d;
    color: white;
    font-family: monospace;
    font-size: ${AK_FONT_SIZE};
    padding: 10px;
    border-radius: 20px;
`

const SendButtonContainer = styled.div`
    width: 20%;
    height: 10%;
    min-width: 200px;
    min-height: 40px;
`

const TestButtonContainer = styled.div`
    width: 20%;
    height: 10%;
    min-width: 200px;
    min-height: 40px;
    margin-top: auto;
`

const SendButton = styled.button`
  width: 80%;
  outline: none;
  height: auto;
  background: #000;
  font-size: ${AK_FONT_SIZE};
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


const AutoKindle = () => {
    const [isTesting, setIsTesting] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files)
        console.log("files:", files)
        setSelectedFiles(files);
      }

    const sendFiles = async () => {
        setIsSending(true);
        for (let file of selectedFiles) {
            const res = await window.electron.email.send(file.path);
            if (res.err) window.alert("Error: " + res.err);
        }
        setIsSending(false);
    }

    const SendTestEmail = async () => {
        setIsTesting(true);
        const res = await window.electron.email.sendTest();
        if (res.err) {
            window.alert("Error: " + res.err);
        }
        else window.alert("Test was successful!");
        setIsTesting(false);
    }

    return (
        <Container>
            <BookSelector type="file" accept=".mobi" onChange={handleFileSelected} />
            {selectedFiles.length > 0 && (
                <SendButtonContainer>
                    <SendButton disabled={isSending} onClick={sendFiles}>{isSending ? `Sending...` : `Send Selected File${selectedFiles.length > 1 ? "s" : ""}`}</SendButton>
                </SendButtonContainer>
            )}
            <TestButtonContainer>
                <SendButton style={{alignSelf: "flex-end"}} disabled={isTesting} onClick={SendTestEmail}>{isTesting ? "Testing..." : "Send Test Email"}</SendButton>
            </TestButtonContainer>
        </Container>
    )
}

export default AutoKindle;