import React, { Component } from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Result from "./components/Result";
import PrivateRoute from "./components/PrivateRoute";

import Context from "./Context/Context";
import {
  apiHandleSignUp,
  apiHandleSignin,
  apiHandleCreateSurvey,
  handleJWTExpirationApi,
  apiGrabSurveyTotalData
} from "./utils/api";

import "./App.css";

export default class App extends Component {
  state = {
    isAuth: false,
    // user: null,
    id: null,
    message: "Please Login to use the app",
    survey: null
  };

  componentDidMount() {
    handleJWTExpirationApi()
      .then(user => {
        this.setState({
          user: user.email,
          isAuth: true
        });
      })
      .catch(error => {
        "sign in";
      });
  }

  handleSignUp = userInfo => {
    apiHandleSignUp(userInfo)
      .then(user => {
        this.setState(
          {
            id: user._id,
            isAuth: true
          },
          () => {
            return <Redirect to='/' />;
          }
        );
      })
      .catch(error => {
        "sign up before proceding the survey";
      });
  };

  handleSignIn = userInfo => {
    apiHandleSignin(userInfo)
      .then(user => {
        this.setState(
          {
            email: user.email,
            isAuth: true
          },
          () => {
            return <Redirect to='/api/users' />;
          }
        );
      })
      .catch(error => {});
  };

  handleSurvey = survey => {
    //survey.user = "5d94eefe06311410967a5abb"; //use the current user id

    apiHandleCreateSurvey(survey)
      .then(user => {
        this.setState(
          {
            email: user.email,
            isAuth: true
          },
          () => {
            return <Redirect to='/' />;
          }
        );
      })
      .catch(error => {});
  };

  logout = () => {
    this.setState(
      {
        user: null,
        message: "Please login to use the app",
        isAuth: false
      },
      () => {
        localStorage.removeItem("jwtToken");
        return <Redirect to='/' />;
      }
    );
  };

  render() {
    return (
      <Context.Provider
        value={{
          isAuth: this.state.isAuth,
          user: this.state.user,
          message: this.state.message,
          handleSignIn: this.handleSignIn,
          handleSignUp: this.handleSignUp,
          handleSurvey: this.handleSurvey,
          logout: this.logout
        }}
      >
        <Router>
          <Navbar />
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/' render={props => <Home {...props} />} />
            <Route path='/signup' render={props => <SignUp {...props} />} />
            <Route path='/signin' render={props => <SignIn {...props} />} />
            <Route
              path='/results'
              render={props => (
                <PrivateRoute {...props} {...this.state} component={Result} />
              )}
            />
            <Switch>
              <Route
                path='/profile'
                render={props => (
                  <PrivateRoute
                    {...props}
                    {...this.state}
                    component={Profile}
                  />
                )}
              />
            </Switch>

            <Route component={NotFound} />
          </Switch>
        </Router>
      </Context.Provider>
    );
  }
}
