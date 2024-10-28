import useAppSelector from '~/utils/use-app-selector'
import withActions, { IWithActions } from '~/utils/with-actions'

const Profile = ({ actions, dispatch }: IWithActions) => {
  const state = useAppSelector((state) => state.auth)

  return (
    <div>
      Welcome {state.user?.email}
      <p className="text-center text-sm mt-4 text-gray-600">
        <button
          onClick={() => dispatch!(actions!.auth.logout())}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Logout
        </button>
      </p>
    </div>
  )
}

export default withActions(Profile)
