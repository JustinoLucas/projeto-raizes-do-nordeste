import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:scale-[0.97]',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark active:scale-[0.97]',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  danger: 'bg-danger text-white hover:bg-red-700 active:scale-[0.97]',
  ghost: 'text-gray-600 hover:bg-gray-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  )
}
