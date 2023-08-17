import React from 'react';
import styled from 'styled-components';

export const Tooltip = ({ text, children, ...rest }) => (
  <StyledTooltip>
    {children}
    <TooltipContent {...rest}>{text}</TooltipContent>
  </StyledTooltip>
);

//#region Styles
const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div`
  width: 90%;
  position: absolute;
  top: 105%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--info-background);
  color: var(--info);
  text-align: center;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  z-index: 1;

  &:not(:empty) {
    padding: 8px;
  }

  ${StyledTooltip}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
//#endregion Styles
