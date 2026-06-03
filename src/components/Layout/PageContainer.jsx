export default function PageContainer({ children, className = '' }) {
  return (
    <main className={`max-w-7xl mx-auto px-4 py-6 pb-24 sm:pb-6 ${className}`}>
      {children}
    </main>
  )
}
