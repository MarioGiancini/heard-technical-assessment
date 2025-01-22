import { ButtonHTMLAttributes, forwardRef } from 'react'
import { classNames } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none'
    
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
      secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
      danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }

    return (
      <button
        ref={ref}
        className={classNames(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading ? 'opacity-50 cursor-not-allowed' : '',
          className ?? ''
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button' 