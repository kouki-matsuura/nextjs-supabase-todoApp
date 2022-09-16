import React from "react";
import styled from "styled-components"
import { Button as MuiButton, ButtonProps } from "@mui/material"

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return <MuiButton {...props}>{children}</MuiButton>
}

const StyledButton = styled(Button)`
  &.MuiButton-root {
    background-color: #1976d2;
    color: white;
  }
`;

export default StyledButton;