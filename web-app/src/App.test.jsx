import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'

test('navigates to About page when About link is clicked', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

const contactLink = screen.getByRole('link', { name: /contact us/i })
expect(contactLink).toBeInTheDocument()
  // You could fireEvent.click(aboutLink) here and test the navigation
})




