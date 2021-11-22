import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';

import Header from './header';
import Home from './home';
import Drives from './drives';
import Footer from './footer';

const App = () => (
  <Router>
    <Header inverse />
    <chakra.main minHeight="100vh" mx="auto">
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/drives'} component={Drives} />
      </Switch>
    </chakra.main>
    <Footer />
  </Router>
);

export default App;
