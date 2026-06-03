export default function Badge({ count, className = '' }) {
  if (!count || count <= 0) return null

  return (
    <span
      className={`absolute -top-2 -right-2 bg-danger text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${className}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
