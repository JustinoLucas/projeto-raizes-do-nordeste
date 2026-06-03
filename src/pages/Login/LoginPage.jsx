import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from '../../components/UI/Toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!email) newErrors.email = 'Informe seu e-mail'
    if (!password) newErrors.password = 'Informe sua senha'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const result = login(email, password)
    if (result.success) {
      toast('Bem-vindo de volta!')
      navigate('/menu')
    } else {
      toast(result.message, 'error')
    }
  }

  return (
    <PageContainer className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-800">
            Entrar
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Acesse sua conta para fazer seu pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{' '}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>

        <div className="mt-6 p-3 bg-accent/10 rounded-xl text-xs text-gray-500">
          <p className="font-semibold text-gray-700 mb-1">Conta de teste:</p>
          <p>E-mail: maria@email.com</p>
          <p>Senha: 123456</p>
        </div>
      </div>
    </PageContainer>
  )
}
