import React from "react";
import { useReveal } from "@/hooks/useReveal";

const STEPS = [
  { title: "Cliente", desc: "Envia uma mensagem no WhatsApp, a qualquer hora do dia.", icon: <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-4-1L3 20l1.2-5A8.4 8.4 0 1 1 21 11.5Z" /> },
  { title: "IA", desc: "Entende a intenção e responde no tom da sua marca, na hora.", icon: <><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /><circle cx="12" cy="12" r="3.2" /></> },
  { title: "Organização", desc: "Cada contato e conversa é categorizado automaticamente no painel.", icon: <><rect x="3" y="4" width="7" height="7" rx="1.4" /><rect x="14" y="4" width="7" height="16" rx="1.4" /><rect x="3" y="14" width="7" height="6" rx="1.4" /></> },
  { title: "Resultado", desc: "Mais vendas fechadas e sua equipe livre para o que importa.", icon: <path d="M4 13l4 4L18 7" /> },
];

export default function HowItWorks() {
  const [tagRef, tagVisible] = useReveal();
  const [flowRef, flowVisible] = useReveal();

  return (
    <section className="how" id="como-funciona">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Como funciona</span>
          <h2>Do primeiro "oi" ao pedido fechado</h2>
          <p>Um fluxo simples que roda sozinho, em segundo plano, 24 horas por dia.</p>
        </div>

        <div ref={flowRef} className={`flow-wrap reveal ${flowVisible ? "is-visible" : ""}`}>
          <div className="flow-line">
            <svg viewBox="0 0 1000 2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="1000" y2="1" stroke="url(#g)" strokeWidth="2" strokeDasharray="6 6" />
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#7c3aed" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flow-steps">
            {STEPS.map((s) => (
              <div className="flow-step" key={s.title}>
                <div className="flow-node active">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.7">
                    {s.icon}
                  </svg>
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
