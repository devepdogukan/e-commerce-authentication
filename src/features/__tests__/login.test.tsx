import { screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '~/features/login'
import renderWithRedux from '~/mocks/redux'
import { authMockActions } from '~/mocks/container/actions'
import navigate from '~/utils/navigate'

jest.mock('~/utils/navigate')

const mockChangeSide = jest.fn()

const mockState = {
  auth: {
    user: null,
    loading: false,
    error: null,
  },
}

describe('login Component', () => {
  it('renders form inputs and login button', async () => {
    await renderWithRedux(<Login changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields on submit', async () => {
    await renderWithRedux(<Login changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(
        screen.getByText('Password must be at least 6 characters'),
      ).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid input', async () => {
    await renderWithRedux(<Login changeSide={mockChangeSide} />, {
      initialState: mockState,
    })

    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(authMockActions.loginUser).toHaveBeenCalled()
      expect(mockChangeSide).not.toHaveBeenCalled()
    })
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('navigates to register when "register" button is clicked', async () => {
    await renderWithRedux(<Login changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    fireEvent.click(screen.getByText('Register'))
    expect(mockChangeSide).toHaveBeenCalledWith('register')
  })

  it('displays loading state when loading', async () => {
    await renderWithRedux(<Login changeSide={mockChangeSide} />, {
      initialState: {
        ...mockState,
        auth: {
          user: null,
          loading: true,
          error: null,
        },
      },
    })
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
  })

  it('displays error message if registration fails', async () => {
    await renderWithRedux(<Login changeSide={mockChangeSide} />, {
      initialState: {
        ...mockState,
        auth: {
          user: null,
          loading: true,
          error: 'Login failed',
        },
      },
    })
    expect(screen.getByText('Login failed')).toBeInTheDocument()
  })
})
