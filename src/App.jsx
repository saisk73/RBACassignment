import './App.css';
import {Route, BrowserRouter, Switch } from 'react-router-dom'
import {ProtectedRoute} from './auth/ProtectedRoute.jsx'
import {ProtectedRouteOrg} from './auth/ProtectedRouteOrg.jsx'
import AdminLogin from './views/superadmin/Login.jsx'
import OrgLogin from './views/org/Login.jsx'
import Superadmin from './views/Superadmin.jsx'
import OrgAdmin from './views/OrgAdmin.jsx'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={OrgLogin} />
          <Route exact path="/admin" component={AdminLogin} />
          <ProtectedRoute path="/a" component={Superadmin} />
          <ProtectedRouteOrg path="/u" component={OrgAdmin} />
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
