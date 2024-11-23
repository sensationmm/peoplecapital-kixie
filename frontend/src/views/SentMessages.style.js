import styled from 'styled-components';
import { palette } from '../utils/color';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 260px;
  row-gap: 20px;
`;

export const MessagesContainer = styled.div`
  position: relative;
  overflow: hidden;

  &:before, &:after {
    content: '';
    width: 100%;
    height: 30px;
    position: absolute;
    z-index: 2;
  }

  &:before {
    top: 0px;
    background: linear-gradient(to top, transparent, ${palette.background.light});
  }

  &:after {
    bottom: 0px;
    background: linear-gradient(to bottom, transparent, ${palette.background.light});
  }
`;

export const Messages = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  row-gap: 10px;
  z-index: 1;
  overflow: scroll;
  padding: 20px 0;
  box-sizing: border-box;
`;

export const NewMessage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  div {
    width: 100%;
  }
`;

export const NoMessages = styled.div`
  background: ${palette.primary.main};
  border-radius: 20px;
  margin-top: 40%;
  transform: translateY(-50%);
  padding: 20px;
  text-align: center;
`;