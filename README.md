# Synapse — versão React

Landing page + carrinho + cadastro da Synapse, portados de HTML/CSS/JS puro para React (Vite) + Tailwind, para permitir o uso de componentes shadcn/magicui como o `InteractiveHoverButton`.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Estrutura

- `src/components/` — Navbar, Hero, Problems, HowItWorks, Team, Demo (chat interativo), Testimonials, Pricing, FAQ, CTASection, Footer
- `src/components/ui/interactive-hover-button.jsx` — o componente que você pediu, já ligado nos 4 botões de "Teste grátis"
- `src/pages/` — Home, Checkout (carrinho), Cadastro (formulário)
- `src/hooks/useReveal.js` — hook que refaz o efeito de aparecer ao rolar a página
- `src/styles/synapse.css` — todo o visual original (cores, cards, animações), preservado
- `src/lib/utils.js` — helper `cn()` padrão do shadcn

## Rotas

- `/` — página inicial
- `/checkout` — carrinho (aceita `?plano=starter|professional|enterprise`)
- `/cadastro` — formulário de criação de conta

## Pendências (mesmas de antes, só que agora em React)

- Colocar sua foto e a do co-fundador em `public/img/`
- Conectar o carrinho e o cadastro a um backend real (gateway de pagamento e API de contas)
