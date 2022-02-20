import styled, { keyframes, css } from 'styled-components';
import { useState } from 'react';
import useIsMounted from '../utils/useIsMounted';
import { IoIosSettings } from 'react-icons/io';

import Settings from './Settings';

const SIDEBAR_WIDTH = `25vw`;
const SIDEBAR_BACKGROUND_COLOR = "#0D0D0D"
export const ICON_SIZE = `30px`;
const SIDEBAR_ANIMATION_DURATION = '100ms';


const SidebarWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: auto;
  height: auto;
`

export const SidebarButton = styled.div`
  background-color: transparent;
  transition-duration: 300ms;
  width: auto;
  height: auto;
  cursor: pointer;
  position: absolute;
  top: 3px;
  right: 3px;

  &:hover {
    opacity: 0.7;
    transform: scale(1.2);
  }
`

const SidebarAnimationIn = keyframes`
  0% {
    width: 0px;
    background-color: transparent;
  }
  100% {
    width: ${SIDEBAR_WIDTH};
    background-color: ${SIDEBAR_BACKGROUND_COLOR};
  }
`
const SidebarAnimationOut = keyframes`
  0% {
    width: ${SIDEBAR_WIDTH};
    background-color: ${SIDEBAR_BACKGROUND_COLOR};
  }
  100% {
    width: 0px;
    background-color: transparent;
  }
`

const SidebarComponent = styled("div")<{isOpen: boolean, shouldAnimate: boolean}>`
  height: 100vh;
  width: 0px;
  background-color: transparent;
  ${props => {
    if (props.isOpen) return css`
      animation: ${SidebarAnimationIn} ${SIDEBAR_ANIMATION_DURATION} ease-out;
      background-color: ${SIDEBAR_BACKGROUND_COLOR};
      width: ${SIDEBAR_WIDTH};
      min-width: 200px;
    `
    if (props.shouldAnimate) return css`
      animation: ${SidebarAnimationOut} ${SIDEBAR_ANIMATION_DURATION} ease-out;
    `
    else return ``;
  }}
`

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldAnimate = useIsMounted();


  return (
    <SidebarWrapper> 
      {!isOpen && (
        <SidebarButton onClick={() => setIsOpen(!isOpen)}>
          <IoIosSettings size={ICON_SIZE}/>
        </SidebarButton>
      )}
      <SidebarComponent isOpen={isOpen} shouldAnimate={shouldAnimate.current}>
        {isOpen && <Settings close={(): void => setIsOpen(!isOpen)}/>}
      </SidebarComponent>
    </SidebarWrapper>
  )
}

export default Sidebar;