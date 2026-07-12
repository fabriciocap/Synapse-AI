import React, { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const PLANS = [
  {
    key: "starter", name: "Starter", monthly: 197, yearly: 157,
    desc: "Para quem está começando a automatizar o atendimento.",
    features: ["1 número de WhatsApp", "Até 1.000 conversas/mês", "Respostas automáticas", "Suporte por e-mail"],
    cta: "Começar teste grátis", variant: "btn-outline",
  },
  {
    key: "professional", name: "Professional", monthly: 497, yearly: 397, featured: true,
    desc: "Para empresas com volume alto de atendimento.",
    features: ["5 números de WhatsApp", "Conversas ilimitadas", "IA com tom de marca personalizado", "Painel completo de estatísticas", "Suporte prioritário"],
    cta: "Começar teste grátis", variant: "btn-primary",
  },
  {
    key: "enterprise", name: "Enterprise", monthly: null, yearly: null,
    desc: "Para operações grandes com necessidades específicas.",
    features: ["Números ilimitados", "Integrações personalizadas via API", "Gerente de conta dedicado", "SLA garantido"],
    cta: "Falar com vendas", variant: "btn-outline",
  },
];

export default function Pricing() {
  const [tagRef, tagVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  const [yearly, setYearly] = useState(false);

  return (
    <section className="pricing" id="precos">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Planos</span>
          <h2>Escolha o plano do tamanho da sua operação</h2>
          <p>7 dias grátis em qualquer plano, sem cartão de crédito. Cancele quando quiser, sem contrato de fidelidade.</p>
        </div>

        <div className="billing-toggle reveal is-visible">
          <span className={!yearly ? "active" : ""}>Mensal</span>
          <button className={`switch ${yearly ? "on" : ""}`} aria-label="Alternar cobrança" onClick={() => setYearly((y) => !y)}></button>
          <span className={yearly ? "active" : ""}>Anual</span>
          <span className="save-badge">Economize 20%</span>
        </div>

        <div ref={gridRef} className={`price-grid reveal-stagger ${gridVisible ? "is-visible" : ""}`}>
          {PLANS.map((plan) => (
            <div className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.key}>
              <span className="price-name">{plan.name}</span>
              <div className="price-value">
                {plan.monthly === null ? (
                  <span className="price-num">Sob consulta</span>
                ) : (
                  <>
                    <span className="price-num">R$ {yearly ? plan.yearly : plan.monthly}</span>
                    <small>/mês</small>
                  </>
                )}
              </div>
              <p className="price-desc">{plan.desc}</p>
              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 13l4 4L18 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="price-trial">
                {plan.monthly === null ? "Condições e prazos sob consulta" : `7 dias grátis, depois R$ ${plan.monthly}/mês`}
              </span>
              <a href={`/checkout?plano=${plan.key}`} className={`btn ${plan.variant}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
