import { useEffect, useState } from 'react'
import Login from '~/features/login'
import Profile from '~/features/profile'
import Register from '~/features/register'
import useAppSelector from '~/utils/use-app-selector'

export type Sides = 'login' | 'register' | 'profile'

const sides = {
  login: Login,
  register: Register,
  profile: Profile,
}

const UserAuthentication = () => {
  const [side, setSide] = useState<Sides>('login')
  const state = useAppSelector((state) => state.auth)
  const changeSide = (side: Sides) => setSide(side)

  const CurrentSide = sides[side]

  useEffect(() => {
    setSide(state?.user ? 'profile' : 'login')
  }, [state?.user?.email])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {side !== 'profile' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                User Authentication
              </h2>
              <p className="text-sm text-gray-600">
                Access your account or create a new one
              </p>
            </div>
            <div
              className="p-2 bg-blue-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex mb-4"
              role="alert"
            >
              <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Info
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Allowed email: <strong>eve.holt@reqres.in</strong>
              </span>
              <svg
                className="fill-current opacity-75 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </div>
          </div>
        )}

        <div className="space-y-6" key={side}>
          {<CurrentSide changeSide={changeSide} />}
        </div>
      </div>
    </div>
  )
}

export default UserAuthentication
