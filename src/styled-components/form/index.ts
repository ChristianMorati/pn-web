import styled from "styled-components";
import { themeColors } from "../../theme/colors";
import colors from "tailwindcss/colors";

export const Input = styled.input`
  width: 100%;
  padding: .5rem;
  border-radius: .5rem;
  color: ${colors.slate[100]};
  background-color: ${themeColors.borderColor};
`;

export const Label = styled.label`
margin-bottom: 6px;
  border-radius: .5rem;
  color: ${colors.slate[300]};
`;