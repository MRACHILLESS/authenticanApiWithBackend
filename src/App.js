import React from 'react';
import { Switch, Route
 } from 'react-router-dom';
import Login from './component/Login';
import Products from './component/Products';
import { ToastContainer} from 'react-toastify';
import ProtectedPath from './component/ProtectedPath';

function App(props) {
  return (
    <div className='container my-5'>
      <Switch>
        <Route exact path="/login" component={Login}/>
        {/*endi ProtectedPath otasi buvotti va products bolasi buvotti ushanga protectpath.js ni ichida children bup keladi*/}
        <ProtectedPath>
          <Route exact path="/products" component={Products}/>
        </ProtectedPath>

      </Switch>
      <ToastContainer/>
      
    </div>
  );
}

export default App;