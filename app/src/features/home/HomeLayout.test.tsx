import { render } from '@testing-library/react';
import React from 'react';
import HomeLayout from './HomeLayout';

describe('HomeLayout', () => {
  it('matches the snapshot', () => {
    const { getByText } = render(
      <HomeLayout>
        <p>This is the home layout test child component</p>
      </HomeLayout>
    );

    expect(getByText('This is the home layout test child component')).toBeVisible();
  });
});
