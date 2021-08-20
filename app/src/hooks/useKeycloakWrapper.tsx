import { useKeycloak } from '@react-keycloak/web';
import { KeycloakInstance } from 'keycloak-js';
import { useCallback, useEffect, useState } from 'react';

/**
 * IUserInfo interface, represents the userinfo provided by keycloak.
 */
export interface IUserInfo {
  name?: string;
  preferred_username?: string;
  given_name?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Interface defining the objects and helper functions returned by `useKeycloakWrapper`
 *
 * @export
 * @interface IKeycloakWrapper
 */
export interface IKeycloakWrapper {
  /**
   * Original raw keycloak object.
   *
   * @type {(KeycloakInstance | undefined)}
   * @memberof IKeycloakWrapper
   */
  keycloak: KeycloakInstance | undefined;
  /**
   * Returns `true` if the user's information has been loaded, false otherwise.
   *
   * @type {boolean}
   * @memberof IKeycloakWrapper
   */
  hasLoadedAllUserInfo: boolean;
  /**
   * The user's system roles, if any.
   *
   * @type {string[]}
   * @memberof IKeycloakWrapper
   */
  systemRoles: string[];
  /**
   * Returns `true` if the user's `systemRoles` contain at least 1 of the specified `validSystemRoles`, `false` otherwise.
   *
   * @memberof IKeycloakWrapper
   */
  hasSystemRole: (validSystemRoles?: string[]) => boolean;
  /**
   * Get out the username portion of the preferred_username from the token.
   *
   * @memberof IKeycloakWrapper
   */
  getUserIdentifier: () => string | null;
  /**
   * Get the identity source portion of the preferred_username from the token.
   *
   * @memberof IKeycloakWrapper
   */
  getIdentitySource: () => string | null;
  username: string | undefined;
  displayName: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

/**
 * Wraps the raw keycloak object, returning an object that contains the original raw keycloak object plus useful helper
 * functions.
 *
 * @return {*}  {IKeycloakWrapper}
 */
function useKeycloakWrapper(): IKeycloakWrapper {
  const { keycloak } = useKeycloak();

  const [keycloakUser, setKeycloakUser] = useState<IUserInfo | null>(null);
  const [isKeycloakUserLoading, setIsKeycloakUserLoading] = useState<boolean>(false);

  const [hasLoadedAllUserInfo, setHasLoadedAllUserInfo] = useState<boolean>(false);

  /**
   * Parses out the username portion of the preferred_username from the token.
   *
   * @param {object} keycloakToken
   * @return {*} {(string | null)}
   */
  const getUserIdentifier = useCallback((): string | null => {
    const userIdentifier = keycloakUser?.['preferred_username']?.split('@')?.[0];

    if (!userIdentifier) {
      return null;
    }

    return userIdentifier;
  }, [keycloakUser]);

  /**
   * Parses out the identity source portion of the preferred_username from the token.
   *
   * @param {object} keycloakToken
   * @return {*} {(string | null)}
   */
  const getIdentitySource = useCallback((): string | null => {
    const identitySource = keycloakUser?.['preferred_username']?.split('@')?.[1];

    if (!identitySource) {
      return null;
    }

    return identitySource;
  }, [keycloakUser]);

  useEffect(() => {
    const getKeycloakUser = async () => {
      const user = (await keycloak?.loadUserInfo()) as IUserInfo;
      setKeycloakUser(user);
      setHasLoadedAllUserInfo(true);
    };

    if (!keycloak?.authenticated) {
      return;
    }

    if (keycloakUser || isKeycloakUserLoading || !keycloak?.authenticated) {
      return;
    }

    setIsKeycloakUserLoading(true);

    getKeycloakUser();
  }, [keycloak, keycloakUser, isKeycloakUserLoading]);

  const getSystemRoles = (): string[] => {
    return [];
  };

  const hasSystemRole = (validSystemRoles?: string[]) => {
    console.log('*************************************');
    console.log(keycloak);
    console.log('*************************************');
    return true;
  };

  const username = (): string | undefined => {
    return keycloakUser?.preferred_username;
  };

  const displayName = (): string | undefined => {
    return keycloakUser?.name || keycloakUser?.preferred_username;
  };

  const email = (): string | undefined => {
    return keycloakUser?.email;
  };

  const firstName = (): string | undefined => {
    return keycloakUser?.firstName;
  };

  const lastName = (): string | undefined => {
    return keycloakUser?.lastName;
  };

  return {
    keycloak: keycloak,
    hasLoadedAllUserInfo,
    systemRoles: getSystemRoles(),
    hasSystemRole,
    getUserIdentifier,
    getIdentitySource,
    username: username(),
    email: email(),
    displayName: displayName(),
    firstName: firstName(),
    lastName: lastName()
  };
}

export default useKeycloakWrapper;
