import { SYSTEM_ROLE } from 'constants/roles';
import HomeRouter from 'features/home/HomeRouter';
import PublicLayout from 'layouts/PublicLayout';
import AccessDenied from 'pages/403/AccessDenied';
import NotFoundPage from 'pages/404/NotFoundPage';
import LogInPage from 'pages/login/LogInPage';
import LogOutPage from 'pages/logout/LogOutPage';
import React from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import AppRoute from 'utils/AppRoute';

const AppRouter: React.FC = (props: any) => {
  const location = useLocation();

  const getTitle = (page: string) => {
    return `BioHub Taxonomy - ${page}`;
  };

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
      <Redirect exact from="/" to="/login" />
      <AppRoute path="/login" title={getTitle('Login')} component={LogInPage} layout={PublicLayout} />
      <AppRoute
        path="/page-not-found"
        title={getTitle('Page Not Found')}
        component={NotFoundPage}
        layout={PublicLayout}
      />
      <AppRoute path="/forbidden" title={getTitle('Forbidden')} component={AccessDenied} layout={PublicLayout} />

      <AppRoute
        protected
        path="/home"
        component={HomeRouter}
        layout={PublicLayout}
        title={getTitle('Home')}
        validRoles={[SYSTEM_ROLE.SYSTEM_ADMIN]}
      />
      <AppRoute protected path="/logout" component={LogOutPage} layout={PublicLayout} title={getTitle('Logout')} />
      <AppRoute title="*" path="*" component={() => <Redirect to="/page-not-found" />} />
    </Switch>
  );
};

export default AppRouter;
