import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';

import Header from './header';
import Home from './home';
import Drives from './drives';
import Files from './files';
import Footer from './footer';
import ErrorFallback from './error-fallback';

const App = () => (
  <Router>
    <Header inverse />
    <chakra.main minHeight="100vh" mx="auto">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/drives'} component={Drives} />
          <Route exact path={'/drives/:driveName/files'} component={Files} />
        </Switch>
      </ErrorBoundary>
    </chakra.main>
    <Footer />
  </Router>
);

export default App;
