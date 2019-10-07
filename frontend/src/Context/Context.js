import React from 'react';

export default React.createContext({
  handleSignIn: () => {},
  handleSignUp: () => {},
  logout: () => {},
  handleResults: () => {},
  handleSurvey: () => {},
  isAuth: false,
  user: null,
  message: ''
});