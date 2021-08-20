import { IConfig } from 'contexts/configContext';
import {
    ensureProtocol, getLogOutUrl
} from './Utils';

describe('ensureProtocol', () => {
  it('does nothing if string already has `http://`', async () => {
    const url = 'http://someurl.com';
    const urlWithProtocol = ensureProtocol(url);
    expect(urlWithProtocol).toEqual(url);
  });

  it('does nothing if string already has `https://`', async () => {
    const url = 'https://someurl.com';
    const urlWithProtocol = ensureProtocol(url);
    expect(urlWithProtocol).toEqual(url);
  });

  it('adds `https://` when no protocol param is provided', async () => {
    const url = 'someurl.com';
    const urlWithProtocol = ensureProtocol(url);
    expect(urlWithProtocol).toEqual(`https://${url}`);
  });

  it('adds `https://` when provided', async () => {
    const url = 'someurl.com';
    const urlWithProtocol = ensureProtocol(url, 'https://');
    expect(urlWithProtocol).toEqual(`https://${url}`);
  });

  it('adds `http://` when provided', async () => {
    const url = 'someurl.com';
    const urlWithProtocol = ensureProtocol(url, 'http://');
    expect(urlWithProtocol).toEqual(`http://${url}`);
  });
});

describe('getLogOutUrl', () => {
  it('returns null when config is null', () => {
    expect(getLogOutUrl((null as unknown) as IConfig)).toBeUndefined();
  });

  it('returns null when config is missing `KEYCLOAK_CONFIG.url`', () => {
    const config = {
      API_HOST: '',
      CHANGE_VERSION: '',
      NODE_ENV: '',
      VERSION: '',
      KEYCLOAK_CONFIG: {
        url: '',
        realm: 'myrealm',
        clientId: ''
      },
      SITEMINDER_LOGOUT_URL: 'https://www.siteminderlogout.com'
    };

    expect(getLogOutUrl(config)).toBeUndefined();
  });

  it('returns null when config is missing `KEYCLOAK_CONFIG.realm`', () => {
    const config = {
      API_HOST: '',
      CHANGE_VERSION: '',
      NODE_ENV: '',
      VERSION: '',
      KEYCLOAK_CONFIG: {
        url: 'https://www.keycloaklogout.com/auth',
        realm: '',
        clientId: ''
      },
      SITEMINDER_LOGOUT_URL: 'https://www.siteminderlogout.com'
    };

    expect(getLogOutUrl(config)).toBeUndefined();
  });

  it('returns null when config is missing `SITEMINDER_LOGOUT_URL`', () => {
    const config = {
      API_HOST: '',
      CHANGE_VERSION: '',
      NODE_ENV: '',
      VERSION: '',
      KEYCLOAK_CONFIG: {
        url: 'https://www.keycloaklogout.com/auth',
        realm: 'myrealm',
        clientId: ''
      },
      SITEMINDER_LOGOUT_URL: ''
    };

    expect(getLogOutUrl(config)).toBeUndefined();
  });

  it('returns a log out url', () => {
    // @ts-ignore
    delete window.location;

    // @ts-ignore
    window.location = {
      origin: 'https://biohub.com'
    };

    const config = {
      API_HOST: '',
      CHANGE_VERSION: '',
      NODE_ENV: '',
      VERSION: '',
      KEYCLOAK_CONFIG: {
        url: 'https://www.keycloaklogout.com/auth',
        realm: 'myrealm',
        clientId: ''
      },
      SITEMINDER_LOGOUT_URL: 'https://www.siteminderlogout.com'
    };

    expect(getLogOutUrl(config)).toEqual(
      'https://www.siteminderlogout.com?returl=https://www.keycloaklogout.com/auth/realms/myrealm/protocol/openid-connect/logout?redirect_uri=https://biohub.com/login&retnow=1'
    );
  });
});
