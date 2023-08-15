import { Header, Notifications } from 'components';

export const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Notifications />
  </>
);
