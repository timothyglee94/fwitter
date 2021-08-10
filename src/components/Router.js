import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home userObj={userObj}/> : <Auth />}
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
