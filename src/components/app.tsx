import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';

import Header from './header';
import Home from './home';
import Drives from './drives';
import Files from './files';
import Footer from './footer';
import ErrorBoundary from './error-boundary';

const App = () => (
  <ErrorBoundary>
    <Router>
      <Header inverse />
      <chakra.main minHeight="100vh" mx="auto">
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/drives'} component={Drives} />
          <Route exact path={'/drives/:driveName/files'} component={Files} />
        </Switch>
      </chakra.main>
      <Footer />
    </Router>
  </ErrorBoundary>
);

export default App;
