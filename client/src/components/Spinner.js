import styled from 'styled-components';

export const Spinner = ({
  height = 50,
  width = 50,
  color = 'var(--gray_400)',
} = {}) => (
  <StyledSpinner
    data-testid="spinner"
    $height={height}
    $width={width}
    $color={color}
  />
);

const StyledSpinner = styled.span`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid ${({ $color }) => $color};
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 0.7s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
