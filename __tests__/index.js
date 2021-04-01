import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ColorPicker from '..';
import {render} from '@testing-library/react';

describe('color picker', () => {
  test('basic', () => {
    const result = render(<ColorPicker/>);
    expect(result.container.innerHTML).toMatchSnapshot();
  });

  test('value', () => {
    const result = render(<ColorPicker value="red"/>);
    expect(result.container.innerHTML).toContain('background: red;');
  });
});
