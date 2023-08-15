export const CloseIcon = ({ width, height, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width={`${width ?? 50}px`}
    height={`${height ?? 50}px`}
  >
    <path
      d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
      stroke={`${stroke ?? 'var(--gray_600)'}`}
      strokeWidth="4"
    />
  </svg>
);
