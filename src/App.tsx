import React from 'react';
import { BrowserRouter, HashRouter, Redirect } from 'react-router-dom';
import { Routers } from './components/RouterContainer/Routers';
import { routeConfig } from '@/config/router';
import './App.less';
import NoMatch from './pages/__Component/NoMatch';

function App() {
  return (
    <HashRouter>
      <Routers
        routers={routeConfig}
        noMatch={
          () => <NoMatch/>
        }
        intercept={(route) => {

        }} />
    </HashRouter>
  );
}

export default App;
