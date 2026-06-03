# 🌿 Rede Raízes do Nordeste

Plataforma web de pedidos para a **Rede Raízes do Nordeste**, uma franquia de lanchonetes que celebra a culinária nordestina brasileira.

Projeto desenvolvido para a disciplina **Projeto Multidisciplinar (Trilha Front-End)**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/Licença-MIT-green)

---

## 📋 Sobre o Projeto

A Rede Raízes do Nordeste é uma aplicação front-end que simula uma plataforma completa de pedidos online para uma franquia de lanchonetes nordestinas. O projeto foi construído com foco em **experiência do usuário**, **responsividade** e **arquitetura mobile-first**, funcionando em dispositivos móveis, tablets, desktops e totens de autoatendimento.

> **Nota:** Este é um projeto acadêmico. Não possui backend real — todos os dados são mockados em JSON e o estado é persistido via `localStorage`.

---

## 🎯 Objetivos

- Desenvolver uma aplicação React profissional com arquitetura escalável
- Implementar design responsivo com abordagem Mobile-First
- Simular um fluxo completo de e-commerce (catálogo → carrinho → pagamento → acompanhamento)
- Aplicar boas práticas de componentização e gerenciamento de estado
- Atender aos requisitos da LGPD com consentimento do usuário

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [React](https://react.dev) | 19 | Biblioteca de UI |
| [Vite](https://vite.dev) | 8 | Build tool e dev server |
| [React Router](https://reactrouter.com) | 7 | Roteamento SPA |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilização utilitária |
| [Lucide React](https://lucide.dev) | 1.17 | Biblioteca de ícones |

---

## 📁 Estrutura de Pastas

```
src/
├── assets/                  # Imagens e recursos estáticos
├── components/
│   ├── Card/                # ProductCard, UnitCard, PromoCard
│   ├── Cart/                # CartItem
│   ├── Layout/              # Header, BottomNav, PageContainer
│   ├── LGPD/                # ConsentModal
│   ├── Loyalty/             # StampCard
│   ├── Order/               # OrderTimeline, ActiveOrderBanner
│   └── UI/                  # Button, Input, Modal, Toast, Badge
├── contexts/
│   ├── AuthContext.jsx       # Autenticação de usuários
│   ├── CartContext.jsx       # Gerenciamento do carrinho
│   ├── LGPDContext.jsx       # Consentimento LGPD
│   ├── OrderContext.jsx      # Pedidos e status
│   └── UnitContext.jsx       # Unidade selecionada
├── data/
│   ├── loyalty.json          # Regras do programa de fidelidade
│   ├── menus.json            # Cardápios por unidade
│   ├── promotions.json       # Promoções e campanhas
│   ├── units.json            # Unidades da franquia
│   └── users.json            # Usuários mock para teste
├── hooks/
│   └── useLocalStorage.js    # Hook de persistência local
├── pages/
│   ├── Cart/                 # Carrinho de compras
│   ├── Login/                # Tela de login
│   ├── Loyalty/              # Programa de fidelidade
│   ├── Menu/                 # Cardápio da unidade
│   ├── Orders/               # Lista de pedidos
│   ├── OrderTracking/        # Acompanhamento em tempo real
│   ├── Payment/              # Pagamento, Aprovado e Negado
│   ├── Promotions/           # Promoções e campanhas
│   ├── Register/             # Cadastro de novo usuário
│   └── UnitSelection/        # Seleção de unidade
├── routes/
│   └── AppRoutes.jsx         # Definição de rotas
├── utils/
│   ├── formatCurrency.js     # Formatação monetária (BRL)
│   ├── orderStatusSimulator.js # Simulador de progresso do pedido
│   └── paymentSimulator.js   # Simulador de gateway de pagamento
├── App.jsx                   # Componente raiz com providers
├── index.css                 # Estilos globais + Tailwind
└── main.jsx                  # Entry point
```

---

## ✅ Funcionalidades Implementadas

### Requisitos Funcionais

| Código | Funcionalidade | Status |
|---|---|---|
| RF01 | Cadastro e autenticação de usuários | ✅ |
| RF02 | Visualização de cardápio por unidade | ✅ |
| RF03 | Realização de pedidos (carrinho completo) | ✅ |
| RF04 | Acompanhamento do status do pedido | ✅ |
| RF05 | Programa de fidelização (cartão de carimbos) | ✅ |
| RF06 | Promoções e campanhas | ✅ |
| RF07 | Integração com pagamento externo (simulada) | ✅ |
| RF08 | Consentimento LGPD | ✅ |

### Requisitos Não Funcionais

| Código | Requisito | Status |
|---|---|---|
| RNF01 | Arquitetura Mobile-First | ✅ |
| RNF02 | Responsividade (Mobile, Tablet, Desktop, Totem) | ✅ |
| RNF03 | Boa performance | ✅ |
| RNF04 | Escalabilidade | ✅ |
| RNF05 | Não armazenar dados financeiros | ✅ |

### Fluxo Principal

```
Selecionar Unidade → Visualizar Cardápio → Adicionar ao Carrinho
→ Login/Cadastro → Consentimento LGPD → Pagamento
→ Gateway Simulado → Confirmação → Acompanhar Pedido → Retirada
```

---

## 🖥️ Telas do Projeto

1. **Seleção de Unidade** — Escolha entre Recife, Salvador ou Fortaleza
2. **Login** — Autenticação com conta de teste inclusa
3. **Cadastro** — Formulário completo com validação
4. **Cardápio** — Grid de produtos com busca e filtro por categoria
5. **Carrinho** — Controle de quantidade, resumo e checkout
6. **Pagamento** — Seleção de método (Crédito, Débito, PIX, Carteira Digital)
7. **Pagamento Aprovado** — Confirmação com resumo do pedido
8. **Pagamento Negado** — Tela de erro com opção de retentativa
9. **Acompanhamento** — Timeline visual (Recebido → Preparando → Pronto → Retirado)
10. **Fidelidade** — Cartão de carimbos visual com regras
11. **Promoções** — Cards com cupons copiáveis e datas de validade

---

## ⚡ Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) versão 18 ou superior
- npm (incluído com o Node.js)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/JustinoLucas/projeto-raizes-do-nordeste.git

# 2. Acesse a pasta do projeto
cd projeto-raizes-do-nordeste

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

### Conta de Teste

| Campo | Valor |
|---|---|
| E-mail | `maria@email.com` |
| Senha | `123456` |

---

## 📦 Como Gerar a Build de Produção

```bash
# Gerar build otimizada
npm run build

# Pré-visualizar a build localmente
npm run preview
```

Os arquivos otimizados serão gerados na pasta `dist/`.

---

## 🌐 Como Publicar

### Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e conecte sua conta GitHub
2. Importe o repositório `projeto-raizes-do-nordeste`
3. O Vite será detectado automaticamente
4. Clique em **Deploy**

### Netlify

1. Acesse [netlify.com](https://netlify.com) e conecte sua conta GitHub
2. Importe o repositório
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Clique em **Deploy site**

### GitHub Pages

```bash
# Instale o plugin de deploy
npm install -D gh-pages

# Adicione ao package.json em "scripts":
# "deploy": "npm run build && gh-pages -d dist"

# Execute o deploy
npm run deploy
```

> **Importante:** Para GitHub Pages, adicione `base: '/projeto-raizes-do-nordeste/'` no `vite.config.js`.

---

## 🧪 Simulações do Projeto

| Recurso | Comportamento |
|---|---|
| **Pagamento** | Gateway simulado com ~80% de aprovação e ~20% de recusa (delay de 2-3s) |
| **Status do pedido** | Avança automaticamente a cada 5s: Recebido → Preparando → Pronto → Retirado |
| **Fidelidade** | Cada pedido adiciona 1 carimbo; ao completar 10, ganha um Combo Raízes |
| **Persistência** | Dados salvos no `localStorage` (carrinho, login, pedidos, consentimento LGPD) |

---

## 👤 Autor

**Lucas Justino**

- GitHub: [@JustinoLucas](https://github.com/JustinoLucas)

---

## 📄 Licença

Este projeto é de uso acadêmico e está sob a licença [MIT](https://opensource.org/licenses/MIT).
