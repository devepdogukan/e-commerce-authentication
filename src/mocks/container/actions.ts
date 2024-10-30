const emptyMockFn = jest.fn(
  () => () => Promise.resolve({ meta: { requestStatus: 'fulfilled' } }),
)

export const authMockActions = {
  registerUser: emptyMockFn,
  loginUser: emptyMockFn,
  logout: jest.fn(() => () => Promise.resolve()),
}

export default {
  auth: authMockActions,
}
