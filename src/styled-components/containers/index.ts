import styled from "styled-components";
import {themeColors} from "../../theme/colors";

export const ContainerGradient = styled.div<{ lightTop?: boolean }>`
  border-radius: .5rem;
  padding: 1rem;
  ${props => props.lightTop ? `
    background: linear-gradient(${themeColors.secondary}, ${themeColors.primary});
  ` :
    `background: linear-gradient(${themeColors.primary}, ${themeColors.secondary});
  `}
`;