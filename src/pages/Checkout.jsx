import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const EXTRA_NUMBER_PRICE = 89;

const PLANS = [
  { key: "starter", name: "Starter", label: "1 número · até 1.000 conversas/mês", price: 197 },
  { key: "professional", name: "Professional", label: "5 números · conversas ilimitadas", price: 497 },
  { key: "enterprise", name: "Enterprise", label: "Números ilimitados · SLA garantido", price: 0 },
];

const PLAN_NAMES = {
  starter: "Plano Starter",
  professional: "Plano Professional",
  enterprise: "Plano Enterprise",
};

const PAY_METHOD_LABELS = { pix: "Pix", cartao: "Cartão de crédito", boleto: "Boleto" };

function formatBRL(value) {
  return "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const requestedPlan = searchParams.get("plano");
  const initialPlan = PLANS.some((p) => p.key === requestedPlan) ? requestedPlan : "professional";

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [qty, setQty] = useState(0);
  const [method, setMethod] = useState("pix");

  const plan = PLANS.find((p) => p.key === selectedPlan);
  const isEnterprise = plan.key === "enterprise";
  const extrasTotal = qty * EXTRA_NUMBER_PRICE;
  const total = plan.price + extrasTotal;

  function handleFinalize(e) {
    e.preventDefault();
    alert("Carrinho de demonstração: aqui entrará a chamada para a API de pagamento (ex.: Mercado Pago).");
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <Link to="/#precos" className="checkout-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          Voltar para os planos
        </Link>

        <div className="section-tag reveal is-visible" style={{ marginBottom: 44 }}>
          <span className="eyebrow">Finalizar assinatura</span>
          <h2>Só mais um passo para ativar a Synapse</h2>
          <p>Este é um carrinho de demonstração. A cobrança real será conectada depois via API de pagamento.</p>
        </div>

        <div className="trial-banner reveal is-visible">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
          <span>Você começa com <b>7 dias grátis</b>. Nenhuma cobrança será feita até o fim do período — cancele quando quiser antes disso.</span>
        </div>

        <div className="checkout-grid">
          <div className="checkout-card reveal is-visible">
            <h3>1. Escolha o plano</h3>
            <div className="plan-select">
              {PLANS.map((p) => (
                <label
                  key={p.key}
                  className={`plan-option ${selectedPlan === p.key ? "selected" : ""}`}
                  onClick={() => setSelectedPlan(p.key)}
                >
                  <input type="radio" name="plano" value={p.key} checked={selectedPlan === p.key} readOnly />
                  <span className="plan-info"><b>{p.name}</b><span>{p.label}</span></span>
                  <span className="plan-price">{p.price === 0 ? "Sob consulta" : `R$ ${p.price}/mês`}</span>
                </label>
              ))}
            </div>

            <div className="qty-row">
              <span>Números de WhatsApp adicionais</span>
              <div className="qty-control">
                <button className="qty-btn" aria-label="Diminuir" onClick={() => setQty((q) => Math.max(0, q - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" aria-label="Aumentar" onClick={() => setQty((q) => Math.min(20, q + 1))}>+</button>
              </div>
            </div>

            <h3 style={{ marginTop: 28 }}>2. Forma de pagamento</h3>
            <div className="pay-methods">
              {["pix", "cartao", "boleto"].map((m) => (
                <div
                  key={m}
                  className={`pay-method ${method === m ? "selected" : ""}`}
                  onClick={() => setMethod(m)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ margin: "0 auto 8px" }}>
                    {m === "pix" && <path d="M12 3l4 4-4 4-4-4 4-4zM12 13l4 4-4 4-4-4 4-4z" />}
                    {m === "cartao" && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>}
                    {m === "boleto" && <path d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16" />}
                  </svg>
                  {PAY_METHOD_LABELS[m]}
                </div>
              ))}
            </div>

            <div className="checkout-note">
              # TODO backend: integrar gateway de pagamento (ex.: Mercado Pago) aqui.<br />
              # Este formulário ainda não envia dados — é só a interface do carrinho.
            </div>
          </div>

          <div className="checkout-card cart-summary reveal is-visible">
            <h3>Resumo do pedido</h3>
            <div className="cart-row">
              <span>{PLAN_NAMES[plan.key]}</span>
              <span>{isEnterprise ? "Sob consulta" : formatBRL(plan.price)}</span>
            </div>
            <div className="cart-row">
              <span>Números adicionais</span>
              <span>{isEnterprise ? "—" : formatBRL(extrasTotal)}</span>
            </div>
            <div className="cart-row">
              <span>Forma de pagamento</span>
              <span>{PAY_METHOD_LABELS[method]}</span>
            </div>
            <div className="cart-row total">
              <span>Cobrado após 7 dias grátis</span>
              <span className="cart-total-value">{isEnterprise ? "Sob consulta" : formatBRL(total)}</span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 24 }} onClick={handleFinalize}>
              Começar teste grátis de 7 dias
            </button>
            <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 14, textAlign: "center" }}>
              Ambiente de demonstração — nenhuma cobrança será feita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
