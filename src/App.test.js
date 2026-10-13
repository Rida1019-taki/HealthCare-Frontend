import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

test('renders HealthCare+ app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const brandElements = screen.getAllByText(/HealthCare\+/i);
  expect(brandElements.length).toBeGreaterThan(0);
});

