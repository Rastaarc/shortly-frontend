import './App.less';
import LandingPage from './pages/General/Landing/LandingPage';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';


function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component= {Register} />
        <Route exact path="/login" component={Login} />

        <Route path="*" render={()=> <div>Page Not Found</div>} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
