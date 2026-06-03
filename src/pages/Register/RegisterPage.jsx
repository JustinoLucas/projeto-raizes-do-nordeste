import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import PageContainer from '../../components/Layout/PageContainer'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from '../../components/UI/Toast'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Informe seu nome'
    if (!form.email.trim()) e.email = 'Informe seu e-mail'
    if (!form.phone.trim()) e.phone = 'Informe seu telefone'
    if (!form.cpf.trim()) e.cpf = 'Informe seu CPF'
    if (!form.password) e.password = 'Crie uma senha'
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'As senhas não coincidem'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const { confirmPassword, ...userData } = form
    const result = register(userData)
    if (result.success) {
      toast('Conta criada com sucesso!')
      navigate('/menu')
    } else {
      toast(result.message, 'error')
    }
  }

  return (
    <PageContainer className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm py-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-800">
            Criar Conta
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Cadastre-se para aproveitar nossos sabores
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Nome completo"
            placeholder="Maria Souza"
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
          />
          <Input
            label="Telefone"
            type="tel"
            placeholder="(81) 99999-1111"
            value={form.phone}
            onChange={handleChange('phone')}
            error={errors.phone}
          />
          <Input
            label="CPF"
            placeholder="123.456.789-00"
            value={form.cpf}
            onChange={handleChange('cpf')}
            error={errors.cpf}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
          />
          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
          />

          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{' '}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}
