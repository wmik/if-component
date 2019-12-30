import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import If from './If';

test('renders children when the condition evaluates to truthy value', async () => {
  const { findByText } = render(<If condition={true}>child</If>);
  expect(await findByText('child')).toBeVisible();
});

test('evaluates a condition given a function', () => {
  const { container } = render(<If condition={() => false}>child</If>);
  expect(container).not.toHaveTextContent('child');
});

test('evaluates a condition given a promise', async () => {
  const { findByText } = render(
    <If condition={Promise.resolve(true)}>child</If>
  );
  expect(await findByText('child')).toBeVisible();
});

test('evaluates conditions in strictTrue mode', () => {
  const { container } = render(
    <If strictTrue condition={1}>
      child
    </If>
  );
  expect(container).not.toHaveTextContent('child');
});

test('evaluates conditions in strictFalse mode', async () => {
  const { findByText } = render(
    <If strictFalse condition={0}>
      child
    </If>
  );
  expect(await findByText('child')).toBeVisible();
});
