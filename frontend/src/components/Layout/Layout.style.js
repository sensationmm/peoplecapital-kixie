import styled from 'styled-components';
import { palette } from '../../utils/color';

export const Container = styled.div`
  position: relative;
  height: calc(95vh - 38px);
  aspect-ratio: 0.57;
  background: ${palette.background.main};
  margin: 2.5vh auto;
  border-radius: 40px;
  border: 3px solid ${palette.border.main};
  padding: 16px;
  display: grid;
  grid-template-rows: 100px 1fr;

  &:after {
    content: '';
    width: 6px;
    height: 100px;
    background: ${palette.border.main};
    position: absolute;
    right: -6px;
    top: 150px;
    border-radius: 0 2px 2px 0;
    overflow: hidden;
  }

  &:before {
    content: '';
    width: 6px;
    height: 250px;
    background: linear-gradient(
      to bottom, 
      ${palette.border.main} 0%,  ${palette.border.main} 20%, transparent 20%,
      transparent 30%, ${palette.border.main} 30%,  ${palette.border.main} 63%, transparent 63%,
      transparent 67%, ${palette.border.main} 67%,  ${palette.border.main} 100%, transparent 100%
    );
    position: absolute;
    left: -6px;
    top: 100px;
    border-radius: 2px 0 0 2px;
  }
`;

export const Content = styled.div`
  position: relative;
  background: ${palette.background.light};
  border-radius: 0 0 40px 40px;
  height: calc(100% - 44px);
  padding: 0 22px 22px 22px;
  overflow: auto;
`;

export const Header = styled.header`
  background: #fff;
  border-radius: 40px 40px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid ${palette.border.dark};

  h1 {
    text-align: center;
    font-size: 1.4em;
  }
`;