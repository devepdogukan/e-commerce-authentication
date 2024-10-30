import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserAuthentication from '~/pages/user-authentication'
import renderWithRedux from '~/mocks/redux'

const mockStore = {
  auth: {
    user: null,
    loading: false,
    error: '',
  },
}

describe('UserAuthentication', () => {
  it('renders login component by default', async () => {
    await renderWithRedux(<UserAuthentication />, { initialState: mockStore })
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('User Authentication')).toBeInTheDocument()
  })

  it('renders profile component if user is authenticated', async () => {
    await renderWithRedux(<UserAuthentication />, {
      initialState: {
        auth: {
          ...mockStore.auth,
          user: {
            email: 'eve.holt@reqres.in',
            token: 'token',
            loginDate: new Date().toISOString(),
          },
        },
      },
    })

    expect(screen.getByText(/Welcome eve.holt@reqres.in/)).toBeInTheDocument()
  })
})
