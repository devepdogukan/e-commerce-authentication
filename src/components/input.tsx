import React from 'react'
import { Control, Controller } from 'react-hook-form'

type DefaultProps = Exclude<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'name' | 'type' | 'required' | 'placeholder'
>

type InputProps = {
  error?: string
  control: unknown
} & DefaultProps

const Input: React.FC<InputProps> = ({
  error,
  name,
  control,
  required,
  type,
  placeholder,
}) => {
  return (
    <div>
      <Controller
        name={name as string}
        control={control as Control}
        rules={{ required }}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input
