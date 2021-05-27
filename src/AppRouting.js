import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Components/Home/HomeComp';
import Login from './Components/Auth/Login/LoginComp';
import Register from './Components/Auth/Register/RegisterComp';
import About from './Components/About/AboutComp';
import Header from './Components/Common/Header/HeaderComp';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        (routeProps) =>
          localStorage.getItem('token') ? (
            <>
              <Header isLoggedIn={true}></Header>
              <div>
                {/* <Sidebar isLoggedIn={true} /> */}
                {/* <div className="main-content">
                  <Component {...routeProps}></Component>
                </div> */}
                <div className='main'>
                  <Component {...routeProps}></Component>
                </div>
              </div>
            </>
          ) : (
            <Redirect to='/'></Redirect>
          ) //TODO add props from where it is redirected
      }
    ></Route>
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          <Header
            isLoggedIn={localStorage.getItem('token') ? true : false}
          ></Header>
          {/* <Sidebar isLoggedIn={localStorage.getItem('token') ? true : false} /> */}
          {/* <div className="main-content">
           */}
          <div className='main'>
            <Component {...routeProps}></Component>
          </div>
        </>
      )}
    ></Route>
  );
};

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          <Header />
          <div className='main-content'>
            <Component {...routeProps}></Component>
          </div>
        </>
      )}
    ></Route>
  );
};

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path='/' component={Home} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
        <PublicRoute exact path='/about' component={About} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouting;
