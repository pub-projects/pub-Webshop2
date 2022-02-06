import { render, screen } from '@testing-library/react';
import { App } from './App';
// import { config } from '../jest.config.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});