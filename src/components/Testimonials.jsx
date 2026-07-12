import React from "react";
import { useReveal } from "@/hooks/useReveal";

const TESTIMONIALS = [
  { quote: "Reduzimos o tempo de resposta de horas para segundos. Nossos clientes notaram a diferença na primeira semana.", name: "Marina Alves", role: "E-commerce de moda" },
  { quote: "A equipe deixou de responder perguntas repetitivas e passou a focar só em fechar vendas. Resultado direto no faturamento.", name: "Rafael Menezes", role: "Clínica odontológica" },
  { quote: "Implementação simples e o painel é muito claro. Hoje sabemos exatamente o que acontece em cada conversa.", name: "Juliana Prado", role: "Agência de marketing" },
];

export default function Testimonials() {
  const [tagRef, tagVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section className="testimonials">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Depoimentos</span>
          <h2>Empresas que já economizam horas todos os dias</h2>
        </div>
        <div ref={gridRef} className={`test-grid reveal-stagger ${gridVisible ? "is-visible" : ""}`}>
          {TESTIMONIALS.map((t) => (
            <div className="test-card" key={t.name}>
              <div className="stars">★★★★★</div>
              <p>"{t.quote}"</p>
              <div className="test-person">
                <div className="test-avatar"></div>
                <div><b>{t.name}</b><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
