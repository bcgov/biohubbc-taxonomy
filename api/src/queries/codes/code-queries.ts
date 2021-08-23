import { SQL, SQLStatement } from 'sql-template-strings';

/**
 * SQL query to fetch system role codes.
 *
 * @returns {SQLStatement} sql query object
 */
export const getSystemRolesSQL = (): SQLStatement => SQL`SELECT system_role_id as id, name from system_role;`;

/**
 * SQL query to fetch administrative activity status type codes.
 *
 * @returns {SQLStatement} sql query object
 */
export const getAdministrativeActivityStatusTypeSQL = (): SQLStatement =>
  SQL`SELECT administrative_activity_status_type_id as id, name FROM administrative_activity_status_type;`;
