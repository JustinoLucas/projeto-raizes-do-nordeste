import { Shield } from 'lucide-react'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import { useLGPD } from '../../contexts/LGPDContext'

export default function ConsentModal({ open, onAccept }) {
  const { acceptConsent } = useLGPD()

  function handleAccept() {
    acceptConsent()
    onAccept?.()
  }

  return (
    <Modal open={open} title="Termos de Privacidade (LGPD)">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-xl">
          <Shield className="w-8 h-8 text-secondary shrink-0" />
          <p className="text-sm text-gray-700">
            Sua privacidade é importante para nós. Precisamos do seu
            consentimento para processar seu pedido.
          </p>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Dados coletados:</strong> nome, e-mail, telefone e CPF para
            emissão de nota fiscal e programa de fidelidade.
          </p>
          <p>
            <strong>Finalidade:</strong> processar pedidos, comunicar status e
            gerenciar seu programa de fidelidade.
          </p>
          <p>
            <strong>Armazenamento:</strong> seus dados são armazenados de forma
            segura e nunca compartilhados com terceiros sem sua autorização.
          </p>
          <p>
            <strong>Seus direitos:</strong> você pode solicitar a exclusão dos
            seus dados a qualquer momento através do nosso atendimento.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleAccept} className="w-full">
            Aceitar e Continuar
          </Button>
          <p className="text-xs text-center text-gray-400">
            Ao aceitar, você concorda com nossa Política de Privacidade conforme
            a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </div>
      </div>
    </Modal>
  )
}
