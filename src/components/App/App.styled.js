import styled from 'styled-components';

export const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.space[5]}px;
  padding-bottom: ${p => p.theme.space[6]}px;
`;
