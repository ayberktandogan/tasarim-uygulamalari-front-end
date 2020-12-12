import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Loading from "./components/loading";

import {
  INDEX_ROUTE,
  LOGIN_ROUTE,
  NOTES_ROUTE,
  REGISTER_CONFIRMATION_ROUTE,
  REGISTER_ROUTE,
  SCHOOLS_ROUTE
} from "./config/front-routes";

// Import pages
import Wrapper from './components/hoc';
import FourohFourPage from './components/404'
import IndexPage from "./pages/index";
import LoginPage from './pages/user/logIn'
import RegisterPage from './pages/user/register'
import RegisterConfirmationPage from "./pages/user/registerConfirmation";
import NotePage from "./pages/note";
import SchoolsPage from "./pages/schools";

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={LOGIN_ROUTE} component={LoginPage} />
          <Route exact path={REGISTER_ROUTE} component={RegisterPage} />
          {/* Böyle olmamalı ama böyle. */}
          <Route exact path={NOTES_ROUTE({ note_id: ":note_id" })} component={NotePage} />
          <Wrapper>
            <Switch>
              <Route exact path={INDEX_ROUTE} component={IndexPage} />
              <Route exact path={SCHOOLS_ROUTE} component={SchoolsPage} />
              <Route exact path={REGISTER_CONFIRMATION_ROUTE + "/:confirmation_hash"} component={RegisterConfirmationPage} />
              <Route component={FourohFourPage} />
            </Switch>
          </Wrapper>
        </Switch>
      </Suspense>
    </Router>
  );
}