import React from "react";
import { useReveal } from "@/hooks/useReveal";

const PROBLEMS = [
  {
    title: "Clientes esperando resposta",
    desc: "Mensagens acumulam fora do horário comercial e o cliente desiste antes de ser atendido.",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  },
  {
    title: "Perda de tempo",
    desc: "Sua equipe gasta horas com perguntas repetitivas em vez de focar em fechar negócios.",
    icon: <><path d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" /></>,
  },
  {
    title: "Atendimento repetitivo",
    desc: "As mesmas dúvidas sobre preço, prazo e formas de pagamento, dezenas de vezes por dia.",
    icon: <path d="M4 6h16M4 12h16M4 18h10" />,
  },
  {
    title: "Desorganização",
    desc: "Contatos e conversas espalhados, sem histórico claro de quem já foi atendido.",
    icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="16" rx="1.5" /><rect x="4" y="14" width="7" height="6" rx="1.5" /></>,
  },
];

export default function Problems() {
  const [tagRef, tagVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section className="problems" id="recursos">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">O problema</span>
          <h2>Seu WhatsApp está custando vendas todos os dias</h2>
          <p>Cada minuto sem resposta é um cliente que pode fechar com o concorrente.</p>
        </div>
        <div ref={gridRef} className={`problem-grid reveal-stagger ${gridVisible ? "is-visible" : ""}`}>
          {PROBLEMS.map((p) => (
            <div className="problem-card" key={p.title}>
              <div className="problem-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {p.icon}
                </svg>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
