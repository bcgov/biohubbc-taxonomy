import { expect } from 'chai';
import { describe } from 'mocha';
import { getAdministrativeActivityStatusTypeSQL, getSystemRolesSQL } from './code-queries';

describe('getSystemRolesSQL', () => {
  it('returns valid sql statement', () => {
    const response = getSystemRolesSQL();
    expect(response).to.not.be.null;
  });
});

describe('getAdministrativeActivityStatusTypeSQL', () => {
  it('returns valid sql statement', () => {
    const response = getAdministrativeActivityStatusTypeSQL();
    expect(response).to.not.be.null;
  });
});
