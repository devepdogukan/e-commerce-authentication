import { screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Register from '~/features/register'
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

describe('Register Component', () => {
  it('renders form inputs and register button', async () => {
    await renderWithRedux(<Register changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields on submit', async () => {
    await renderWithRedux(<Register changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(
        screen.getByText('Password must be at least 6 characters'),
      ).toBeInTheDocument()
    })
  })

  it('submits form successfully with valid input', async () => {
    await renderWithRedux(<Register changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    fireEvent.input(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    })
    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(authMockActions.registerUser).toHaveBeenCalled()
      expect(mockChangeSide).not.toHaveBeenCalled()
    })
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('navigates to login when "Login" button is clicked', async () => {
    await renderWithRedux(<Register changeSide={mockChangeSide} />, {
      initialState: mockState,
    })
    fireEvent.click(screen.getByText('Login'))
    expect(mockChangeSide).toHaveBeenCalledWith('login')
  })

  it('displays loading state when loading', async () => {
    await renderWithRedux(<Register changeSide={mockChangeSide} />, {
      initialState: {
        ...mockState,
        auth: {
          user: null,
          loading: true,
          error: null,
        },
      },
    })
    expect(screen.getByRole('button', { name: 'Register' })).toBeDisabled()
  })

  it('displays error message if registration fails', async () => {
    await renderWithRedux(<Register changeSide={mockChangeSide} />, {
      initialState: {
        ...mockState,
        auth: {
          user: null,
          loading: true,
          error: 'Registration failed',
        },
      },
    })
    expect(screen.getByText('Registration failed')).toBeInTheDocument()
  })
})
