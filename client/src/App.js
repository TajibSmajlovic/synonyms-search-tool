import GlobalStyle from 'utils/styles/globalStyle';
import Views from 'views';
import { RootProvider } from 'context';

const App = () => (
  <RootProvider>
    <GlobalStyle />
    <Views />
  </RootProvider>
);

export default App;
