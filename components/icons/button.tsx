import React, { ForwardedRef } from 'react'



interface Props {
  children: React.ReactNode
  onClick?: (e:any) => void
  type?: 'submit' | 'reset' | 'button' | undefined
  disabled?: boolean
  title?: string
}


export const Button: React.FC<Props> = React.forwardRef(
  (
    {  children, onClick, disabled, type = 'button', title },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold  border-2 leading-6 text-gray-900 hover:bg-gray-400/10'
        onClick={onClick}
        disabled={disabled}
        title={title}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button';