import { render } from '@testing-library/react';
import { AuthStateContext, IAuthState } from 'contexts/authStateContext';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import AccessDenied from './AccessDenied';

describe('AccessDenied', () => {
  it('redirects to `/login` when user is not authenticated', () => {
    const authState = ({
      keycloakWrapper: {
        keycloak: {
          authenticated: false
        },
        hasLoadedAllUserInfo: false,

        systemRoles: [],
        hasSystemRole: jest.fn(),
        getUserIdentifier: jest.fn(),
        getIdentitySource: jest.fn(),
        username: 'testusername',
        displayName: 'testdisplayname',
        email: 'test@email.com',
        firstName: 'testfirst',
        lastName: 'testlast'
      }
    } as unknown) as IAuthState;

    const history = createMemoryHistory();

    history.push('/forbidden');

    render(
      <AuthStateContext.Provider value={authState}>
        <Router history={history}>
          <AccessDenied />
        </Router>
      </AuthStateContext.Provider>
    );

    expect(history.location.pathname).toEqual('/login');
  });

  it('renders a spinner when user is authenticated and `hasLoadedAllUserInfo` is false', () => {
    const authState = ({
      keycloakWrapper: {
        keycloak: {
          authenticated: true
        },
        hasLoadedAllUserInfo: false,

        systemRoles: [],
        hasSystemRole: jest.fn(),
        getUserIdentifier: jest.fn(),
        getIdentitySource: jest.fn(),
        username: 'testusername',
        displayName: 'testdisplayname',
        email: 'test@email.com',
        firstName: 'testfirst',
        lastName: 'testlast'
      }
    } as unknown) as IAuthState;

    const history = createMemoryHistory();

    history.push('/forbidden');

    const { asFragment } = render(
      <AuthStateContext.Provider value={authState}>
        <Router history={history}>
          <AccessDenied />
        </Router>
      </AuthStateContext.Provider>
    );

    // does not change location
    expect(history.location.pathname).toEqual('/forbidden');

    // renders a spinner
    expect(asFragment()).toMatchSnapshot();
  });
});
