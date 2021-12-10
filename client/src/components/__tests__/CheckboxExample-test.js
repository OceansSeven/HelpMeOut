/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxExample from '../exampleComponent/CheckboxExample.jsx';

afterEach(cleanup);

it('CheckboxExample changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <CheckboxExample labelOn="On" labelOff="Off" />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
