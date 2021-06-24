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
import Links from './pages/Links/Links'
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Users from './pages/Users/Users';

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
        <Route exact path="/links" component={Links} />
        <Route exact path="/subscriptions" component={Subscriptions} />
        <Route exact path="/users" component={Users} />


        {/****************ERRORS*********************/}
        <Route path="*" component={PageNotFound} />

      </Switch>
      </div>
    </Router>
  );
}

export default App;
