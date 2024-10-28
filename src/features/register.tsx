import React from 'react'
import { Sides } from '~/pages/user-authentication'
import withActions, { IWithActions } from '~/utils/with-actions'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAppSelector from '~/utils/use-app-selector'
import Form from '~/components/form'
import Input from '~/components/input'
import navigate from '~/utils/navigate'

type FormFields = {
  email: string
  password: string
  username: string
}
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const Register = ({
  actions,
  dispatch,
  changeSide,
}: IWithActions & { changeSide: (side: Sides) => void }) => {
  const state = useAppSelector((state) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const request = (await dispatch!(
      actions?.auth.registerUser(data),
    )) as unknown

    if (
      request &&
      (request as { meta: { requestStatus: string } }).meta.requestStatus ===
        'fulfilled'
    ) {
      navigate('/')
    }
  }
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        isLoading={state.loading}
        error={state.error}
      >
        <div className="space-y-4">
          <Input
            type="text"
            control={control}
            name="username"
            placeholder="Username"
            error={errors.username?.message}
          />

          <Input
            type="email"
            control={control}
            name="email"
            placeholder="Email"
            error={errors.email?.message}
          />

          <Input
            type="password"
            control={control}
            name="password"
            placeholder="Password"
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </Form>
      <p className="text-center text-sm mt-4 text-gray-600">
        Already have an account?
        <button onClick={() => changeSide('login')} className="text-blue-600">
          Login
        </button>
      </p>
    </>
  )
}

export default withActions(Register)
