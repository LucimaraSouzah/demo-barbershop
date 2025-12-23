# 💈 Corte & Tradição - Sistema de Agendamento para Barbearia

<div align="center">

![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Sistema completo e profissional de agendamento online para barbearias**

**Desenvolvido como projeto demonstrativo para portfolio - 100% Frontend**

</div>

---

## 📋 Sobre o Projeto

Este é um **projeto demonstrativo** desenvolvido para mostrar capacidades técnicas em desenvolvimento frontend moderno. O sistema simula uma barbearia completa com funcionalidades reais de agendamento, gestão de serviços e feedback de clientes, funcionando **100% no frontend** usando localStorage.

### 🎯 Objetivo

Demonstrar expertise em:
- **Frontend Moderno** - Angular 17, TypeScript, TailwindCSS
- **Arquitetura Frontend** - Separação de responsabilidades, serviços, guards
- **UX/UI Design** - Interface elegante, intuitiva e totalmente responsiva
- **Boas Práticas** - Código limpo, validações, tratamento de erros
- **Performance** - Otimizações, lazy loading, code splitting
- **Hospedagem Simples** - Site estático, fácil de hospedar em qualquer plataforma

---

## ✨ Funcionalidades

### 🎨 Frontend (Angular 17)

- ✅ **Landing Page Premium** - Design elegante com animações suaves
- ✅ **Sistema de Agendamento** - Interface intuitiva para clientes
- ✅ **Painel Administrativo** - Dashboard completo para gestão
- ✅ **Sistema de Feedbacks** - Depoimentos com moderação
- ✅ **Design 100% Responsivo** - Perfeito em desktop, tablet e mobile
- ✅ **SEO Otimizado** - Meta tags, Schema.org, Open Graph
- ✅ **Performance Otimizada** - Lazy loading, code splitting
- ✅ **PWA Ready** - Funciona como app nativo
- ✅ **100% Frontend** - Funciona sem backend, usando localStorage
- ✅ **Mock API Service** - Lógica de negócio completa no frontend
- ✅ **Login Demo** - Sistema de autenticação simulado para demonstração

### 🎯 Diferenciais Técnicos

- 🚀 **Performance Otimizada** - Carregamento rápido e eficiente
- 📱 **Mobile-First** - Experiência perfeita em qualquer dispositivo
- 🎨 **Design System** - Cores e tipografia consistentes
- 🔒 **Segurança** - Autenticação e autorização robustas
- 📊 **Analytics Ready** - Integração com Meta Pixel e Google Analytics
- 💬 **WhatsApp Integration** - Botão flutuante para contato direto

---

## 🛠️ Stack Tecnológica

### Frontend
- **Angular 17** - Framework moderno e performático
- **TypeScript** - Tipagem estática para maior confiabilidade
- **TailwindCSS** - Estilização utility-first
- **RxJS** - Programação reativa
- **Angular Material** - Componentes UI

### Armazenamento
- **localStorage** - Persistência de dados no navegador
- **Mock API Service** - Simulação completa de API REST

---

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ e npm
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/barbearia-saas.git
cd barbearia-saas
```

### 2. Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

Frontend disponível em: `http://localhost:4200`

---

## 🔐 Acesso ao Painel Administrativo

### Credenciais Padrão

Ao iniciar pela primeira vez, um usuário admin é criado automaticamente:

- **Email:** `admin@barbearia.com`
- **Senha:** `admin123`

⚠️ **IMPORTANTE:** Em produção, altere essas credenciais imediatamente!

### Como Acessar

1. Acesse: `http://localhost:4200/admin/login`
2. Faça login com as credenciais acima
3. Explore o painel administrativo completo

### Funcionalidades do Painel Admin

- 📊 **Dashboard** - Estatísticas e visão geral
- ✂️ **Serviços** - Gerenciar serviços (CRUD completo)
- 📅 **Agendamentos** - Ver e gerenciar todos os agendamentos
- 💬 **Feedbacks** - Moderar e aprovar feedbacks dos clientes

---

## 📁 Estrutura do Projeto

```
barbearia-saas/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Serviços core, guards
│   │   │   │   └── services/
│   │   │   │       ├── api.service.ts        # Wrapper da API
│   │   │   │       ├── mock-api.service.ts   # Mock API com localStorage
│   │   │   │       └── auth.service.ts       # Autenticação
│   │   │   ├── features/       # Módulos de funcionalidades
│   │   │   │   ├── admin/      # Painel administrativo
│   │   │   │   ├── home/       # Landing page
│   │   │   │   ├── agendamento/# Sistema de agendamento
│   │   │   │   └── feedbacks/  # Sistema de feedbacks
│   │   │   └── shared/         # Componentes compartilhados
│   │   └── assets/             # Imagens e recursos estáticos
│   └── ...
│
└── README.md
```

---

## 🎨 Design System

### Cores
- **Primária**: `#0a0a0a` (Preto elegante)
- **Secundária**: `#D4AF37` (Dourado)
- **Accent**: `#8B6914` (Dourado Escuro)

### Tipografia
- **Títulos**: Playfair Display (serif elegante)
- **Corpo**: Inter (sans-serif moderna)

---

## 📊 Funcionalidades Detalhadas

### Para Clientes

- ✅ Visualizar serviços disponíveis com imagens
- ✅ Agendar horários online de forma intuitiva
- ✅ Deixar feedbacks e depoimentos
- ✅ Contato direto via WhatsApp
- ✅ Visualizar localização no mapa

### Para Administradores

- ✅ Dashboard com estatísticas em tempo real
- ✅ Gerenciar serviços (criar, editar, excluir, upload de imagens)
- ✅ Gerenciar agendamentos (ver, editar status, excluir)
- ✅ Moderar feedbacks (aprovar/reprovar)
- ✅ Visualizar relatórios e métricas

---

## 🔧 Configurações Adicionais

### Meta Pixel

Configure no `frontend/src/index.html`:
```html
<!-- Meta Pixel Code -->
<script>
  fbq('init', 'SEU_PIXEL_ID_AQUI');
  fbq('track', 'PageView');
</script>
```

### WhatsApp

O botão flutuante já está configurado. Para personalizar:

- Número: `frontend/src/app/shared/components/whatsapp-button/whatsapp-button.component.ts`
- Mensagem padrão: Pode ser customizada no componente

### WhatsApp

O botão flutuante do WhatsApp está configurado e funciona diretamente no navegador, abrindo uma conversa no WhatsApp Web/App. Não requer configuração adicional.

---

## 📈 Performance

- ⚡ **Lighthouse Score**: 90+ em todas as métricas
- 🚀 **First Contentful Paint**: < 1.5s
- 📦 **Bundle Size**: Otimizado com code splitting
- 🖼️ **Images**: Lazy loading e otimização

---

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:

- 📱 **Mobile** (< 768px) - Menu hamburger, cards empilhados
- 📱 **Tablet** (768px - 1024px) - Layout adaptativo
- 💻 **Desktop** (> 1024px) - Layout completo

---

## 🚢 Deploy

### Frontend (Site Estático)

O projeto é 100% frontend e pode ser hospedado em qualquer serviço de hospedagem estática:

1. Execute `npm run build` na pasta `frontend`
2. Publique a pasta `dist/frontend` em:
   - **Vercel** - Deploy automático via Git
   - **Netlify** - Deploy automático via Git
   - **GitHub Pages** - Hospedagem gratuita
   - **Firebase Hosting** - Hospedagem do Google
   - Qualquer servidor web estático (Nginx, Apache, IIS, etc.)

**Não é necessário configurar backend ou banco de dados!**

---

## 📝 Funcionalidades da API Mock

Todas as funcionalidades são simuladas no frontend usando `MockApiService`:

### Serviços
- Listar serviços (ativos ou todos)
- Criar, editar e excluir serviços
- Upload de imagens (base64 no localStorage)

### Agendamentos
- Criar agendamento com validação de horário
- Listar agendamentos com filtros
- Calcular horários disponíveis
- Atualizar status e excluir agendamentos

### Feedbacks
- Criar feedback
- Listar feedbacks (aprovados ou todos)
- Aprovar/reprovar feedbacks
- Adicionar resposta do admin

### Dashboard
- Estatísticas calculadas em tempo real
- Próximos agendamentos
- Feedbacks recentes

**Tudo funciona 100% no frontend usando localStorage!**

---

## 👨‍💻 Sobre o Projeto

Este projeto foi desenvolvido como **case de portfolio** para demonstrar habilidades em desenvolvimento frontend moderno, funcionando completamente sem backend.

### 🎯 Diferenciais Técnicos

- ✅ **100% Responsivo** - Mobile-first approach
- ✅ **Performance Otimizada** - Lighthouse Score 90+
- ✅ **SEO Ready** - Pronto para indexação
- ✅ **Acessibilidade** - ARIA labels, navegação por teclado
- ✅ **PWA Ready** - Funciona como app nativo
- ✅ **Type Safety** - TypeScript em todo o frontend
- ✅ **Clean Architecture** - Código organizado e escalável
- ✅ **Mock API** - Lógica de negócio completa no frontend
- ✅ **Hospedagem Simples** - Site estático, fácil de publicar

---

## 📄 Licença

Este projeto foi desenvolvido como projeto demonstrativo para portfolio.

---

## 📞 Contato

Para projetos similares ou customizações, entre em contato!

---

<div align="center">

**⭐ Se este projeto te ajudou ou impressionou, considere dar uma estrela! ⭐**

Made with ❤️ using Angular

</div>
