import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './App.less';

import LandingPage from './pages/General/Landing/LandingPage';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import PageNotFound from './pages/Errors/PageNotFound/PageNotFound';
import Dashboard from './pages/Dashboard/Dashboard'
import OverviewAdmin from './pages/Dashboard/Admin/Overview/OverviewAdmin'
import Overview from './pages/Dashboard/Users/Overview/Overview'

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        {/****************GENERAL*********************/}
        <Route exact path="/" component={LandingPage} />

        {/****************AUTH*********************/}
        <Route exact path="/signup" component= {Register} />
        <Route exact path="/login" component={Login} />

        {/****************DASHBOARD*********************/}
        <Route exact path="/dashboard" component={Dashboard} />

        {/****************USERS DASHBOARD*********************/}
        <Route exact path="/overview" component={Overview} />

        {/****************ADMIN DASHBOARD*********************/}
        <Route exact path="/admin/overview" component={OverviewAdmin} />

        {/****************ERRORS*********************/}
        <Route path="*" component={PageNotFound} />

      </Switch>
      </div>
    </Router>
  );
}

export default App;
