import * as Styled from './Layout.style';

export const Layout = ({title, children}) => {
  return (
    <Styled.Container>
      <Styled.Header><h1>{title}</h1></Styled.Header>
      <Styled.Content>
        {children}
      </Styled.Content>
    </Styled.Container>
  );
}