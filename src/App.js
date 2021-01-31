import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Form from 'views/Form';

const App = () => {

  const history = createBrowserHistory();

  return (
        <main className="main">
          <BrowserRouter history={history}>
            <Switch>
              <Route exact path="/" component={Form} />
            </Switch>
          </BrowserRouter>
        </main>
  );
};

export default App;
