import React from 'react';
import { Redirect, Switch } from 'react-router';
import AppRoute from 'utils/AppRoute';
import PrivateRoute from 'utils/PrivateRoute';
import HomeLayout from './HomeLayout';
import HomePage from './HomePage';

interface IHomeRouterProps {
  classes: any;
}

/**
 * Router for all `/home/*` pages.
 *
 * @param {*} props
 * @return {*}
 */
const HomeRouter: React.FC<IHomeRouterProps> = (props) => {
  return (
    <Switch>
      <PrivateRoute exact layout={HomeLayout} path="/home" component={HomePage} componentProps={props} />
      {/*  Catch any unknown routes, and re-direct to the not found page */}
      <AppRoute title="*" path="/home/*" component={() => <Redirect to="/page-not-found" />} />
    </Switch>
  );
};

export default HomeRouter;
