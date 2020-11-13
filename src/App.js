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
import { INDEX_ROUTE, SCHOOLS_ROUTE } from "./config/front-routes";



function App() {
  return (

    <Router>
      <Wrapper>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={INDEX_ROUTE} />
            <Route exact path={SCHOOLS_ROUTE} />
            <Route component={FourohFourPage} />
          </Switch>
        </Suspense>
      </Wrapper>
    </Router>
  );
}

export default App;
