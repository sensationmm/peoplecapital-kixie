import styled from 'styled-components';
import { palette } from '../../utils/color';

export const Container = styled.div`
  background: ${palette.primary.main};
  border-radius: 20px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 30px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding-right: 20px;
`;

export const Recipient = styled.div`
  font-weight: bold;
`;

export const Date = styled.div`
  font-size: 0.8em;
  color: ${palette.tertiary.main};
`;

export const Actions = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);

  > svg {
    cursor: pointer;

    &:hover {
      fill: ${palette.secondary.main};
    }
  }
`;

