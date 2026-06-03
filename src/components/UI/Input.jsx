export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-gray-800 placeholder:text-gray-400 transition-colors outline-none ${
          error
            ? 'border-danger focus:border-danger'
            : 'border-gray-200 focus:border-primary'
        }`}
        {...props}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  )
}
