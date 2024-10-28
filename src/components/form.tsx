import React from 'react'
import Loader from './loader'

type FormProps = {
  children: React.ReactNode
  isLoading?: boolean
  onSubmit: () => void
  error: string | null
} & React.HTMLAttributes<HTMLFormElement>

const Form = ({
  onSubmit,
  children,
  error,
  isLoading,
  ...props
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      <div className="relative">
        {isLoading && (
          <div className="absolute z-10 backdrop-blur-sm w-full h-full grid place-content-center">
            <Loader />
          </div>
        )}
        {error && (
          <div
            className="p-4 mb-4 text-sm rounded-lg  bg-gray-800 text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}
        {children}
      </div>
    </form>
  )
}

export default Form
