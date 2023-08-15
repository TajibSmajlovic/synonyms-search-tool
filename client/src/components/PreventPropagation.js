export const PreventPropagation = ({ children }) => (
  <span onClick={(e) => e.stopPropagation()}>{children}</span>
);
