import { IDBConnection } from '../database/db';
import { getAdministrativeActivityStatusTypeSQL, getSystemRolesSQL } from '../queries/codes/code-queries';
import { getLogger } from '../utils/logger';

const defaultLog = getLogger('queries/code-queries');

export interface IAllCodeSets {
  system_roles: object;
  administrative_activity_status_type: object;
}

/**
 * Function that fetches all code sets.
 *
 * @param {PoolClient} connection
 * @returns {IAllCodeSets} an object containing all code sets
 */
export async function getAllCodeSets(connection: IDBConnection): Promise<IAllCodeSets | null> {
  defaultLog.debug({ message: 'getAllCodeSets' });

  await connection.open();

  const [system_roles, administrative_activity_status_type] = await Promise.all([
    await connection.query(getSystemRolesSQL().text),
    await connection.query(getAdministrativeActivityStatusTypeSQL().text)
  ]);

  await connection.commit();

  connection.release();

  return {
    system_roles: (system_roles && system_roles.rows) || [],
    administrative_activity_status_type:
      (administrative_activity_status_type && administrative_activity_status_type.rows) || []
  };
}
