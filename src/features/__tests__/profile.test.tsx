import { screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '~/features/profile'
import renderWithRedux from '~/mocks/redux'
import { authMockActions } from '~/mocks/container/actions'

const mockState = {
  auth: {
    user: {
      email: 'testuser@example.com',
      token: '',
      loginDate: new Date().toISOString(),
    },
    loading: false,
    error: null,
  },
}
describe('Profile Component', () => {
  it('renders user email correctly', async () => {
    await renderWithRedux(<Profile />, {
      initialState: mockState,
    })
    expect(screen.getByText('Welcome testuser@example.com')).toBeInTheDocument()
  })

  it('renders state is empty', async () => {
    await renderWithRedux(<Profile />, {
      initialState: {
        auth: {
          user: null,
          loading: false,
          error: null,
        },
      },
    })
  })

  it('calls logout action on button click', async () => {
    await renderWithRedux(<Profile />, {
      initialState: mockState,
    })

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }))

    expect(authMockActions.logout).toHaveBeenCalled()
  })
})
