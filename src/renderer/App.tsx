import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import HomeScreen from './components/HomeScreen';

declare global {
  interface Window {
    electron: {
      email: {
        send: (path: string) => any;
        sendTest: () => any;
      }
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
`;

const ToRender = () => {
  return (
    <Wrapper>
      <HomeScreen />
    </Wrapper>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToRender />} />
      </Routes>
    </Router>
  );
}
