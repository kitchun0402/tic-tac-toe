import { render, screen } from '@testing-library/react'
import App from './App'

/** @todo remove this dummy test later */
test('renders content', () => {
  render(<App />)
  const contentElement = screen.getByText(/Hello World/i)
  expect(contentElement).toBeInTheDocument()
})
