export const If = ({ predicate = false, children }) =>
  predicate ? children : null;
