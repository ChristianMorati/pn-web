import styled from "styled-components";

const primary = '#1e293b';
const secondary = '#334155';

export const ContainerGradient = styled.div<{ lightTop?: boolean }>`
  border-radius: .5rem;
  padding: 1rem;
  ${props => props.lightTop ? `
    background: linear-gradient(${secondary}, ${primary});
  ` : 
    `background: linear-gradient(${primary}, ${secondary});
  `}
`;