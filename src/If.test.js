import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import If from './If';

test('If renders without crashing', async () => {
  const { findByText } = render(<If condition={true}>child</If>);
  expect(await findByText('child')).toBeVisible();
});
