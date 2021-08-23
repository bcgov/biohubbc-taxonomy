import useAdminApi from './api/useAdminApi';
import useAxios from './api/useAxios';
import useCodesApi from './api/useCodesApi';
import useUserApi from './api/useUserApi';

/**
 * Returns a set of supported api methods.
 *
 * @return {*} object whose properties are supported api methods.
 */
export const useBiohubApi = () => {
  const customAxios = useAxios();

  const codes = useCodesApi(customAxios);

  const user = useUserApi(customAxios);

  const admin = useAdminApi(customAxios);

  return {
    codes,
    user,
    admin
  };
};
