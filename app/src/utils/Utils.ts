import { IConfig } from 'contexts/configContext';

/**
 * Checks if a url string starts with an `http(s)://` protocol, and adds `https://` if it does not.
 *
 * @param {string} url
 * @param {('http://' | 'https://')} [protocol='https://'] The protocol to add, if necessary. Defaults to `https://`.
 * @return {*}  {string} the url which is guaranteed to have an `http(s)://` protocol.
 */
export const ensureProtocol = (url: string, protocol: 'http://' | 'https://' = 'https://'): string => {
  return ((url.startsWith('http://') || url.startsWith('https://')) && url) || `${protocol}${url}`;
};

/**
 * Returns a url that when navigated to, will log the user out, redirecting them to the login page.
 *
 * @param {IConfig} config
 * @return {*}  {(string | undefined)}
 */
export const getLogOutUrl = (config: IConfig): string | undefined => {
  if (!config || !config.KEYCLOAK_CONFIG?.url || !config.KEYCLOAK_CONFIG?.realm || !config.SITEMINDER_LOGOUT_URL) {
    return;
  }

  const localRedirectURL = `${window.location.origin}/login`;

  const keycloakLogoutRedirectURL = `${config.KEYCLOAK_CONFIG.url}/realms/${config.KEYCLOAK_CONFIG.realm}/protocol/openid-connect/logout?redirect_uri=${localRedirectURL}`;

  return `${config.SITEMINDER_LOGOUT_URL}?returl=${keycloakLogoutRedirectURL}&retnow=1`;
};
