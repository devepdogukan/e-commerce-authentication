import navigate from '~/utils/navigate'
import withActions, { IWithActions } from '~/utils/with-actions'
import '~/user-auth.css'
import useAppSelector from '~/utils/use-app-selector'

const Navbar = ({ actions, dispatch }: IWithActions) => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <nav className="bg-blue-600 p-4 shadow-md text-white">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <p
            onClick={() => navigate('/')}
            className="text-xl font-semibold hover:text-blue-200 cursor-pointer"
          >
            Home
          </p>

          {user && (
            <>
              <p
                onClick={() => navigate('/orders')}
                className="hover:text-blue-200 cursor-pointer"
              >
                Orders
              </p>
              <p
                onClick={() => navigate('/auth')}
                className="hover:text-blue-200 cursor-pointer"
              >
                Profile
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => {
            if (!user) return navigate('/auth')
            dispatch!(actions!.auth.logout())
            dispatch!(actions!.order.clearOrders())
            navigate('/')
          }}
          className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  )
}

export default withActions(Navbar)
