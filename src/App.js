import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Loading from "./components/loading";

// Import page
import Wrapper from './components/hoc';
import FourohFourPage from './components/404'
import { INDEX_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SCHOOLS_ROUTE } from "./config/front-routes";

import IndexPage from "./pages/index";
import LoginPage from './pages/user/logIn'
import RegisterPage from './pages/user/register'

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={LOGIN_ROUTE} component={LoginPage} />
          <Route exact path={REGISTER_ROUTE} component={RegisterPage} />
          <Wrapper>
            <Switch>
              <Route exact path={INDEX_ROUTE} component={IndexPage} />
              <Route exact path={SCHOOLS_ROUTE} />
              <Route component={FourohFourPage} />
            </Switch>
          </Wrapper>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
