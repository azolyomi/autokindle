import styled from 'styled-components';
import Sidebar from './Sidebar';
import AutoKindle from './AutoKindle';


const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const HeaderText = styled.h1`
  font-size: 7vw;
  color: white;
  font-family: monospace;
  text-align: center;
`

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText>AutoKindle</HeaderText>
    </HeaderContainer>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Home = () => {
  return (
      <Container>
        <Header />
        <AutoKindle />
        <Sidebar />
      </Container>
  );
};

export default Home;
