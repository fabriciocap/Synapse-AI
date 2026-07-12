import React from "react";
import { useReveal } from "@/hooks/useReveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function CTASection() {
  const [ref, visible] = useReveal();

  return (
    <section className="cta-section">
      <div className="container">
        <div ref={ref} className={`cta-box reveal ${visible ? "is-visible" : ""}`}>
          <h2>Pronto para nunca mais perder um cliente por demora?</h2>
          <p>Comece agora e veja sua primeira automação funcionando em minutos. 7 dias grátis, sem cartão de crédito.</p>
          <div className="hero-actions">
            <a href="/checkout?plano=professional">
              <InteractiveHoverButton text="Testar grátis" className="ihb-lg" />
            </a>
            <a href="#demo" className="btn btn-outline btn-lg">Ver demonstração</a>
          </div>
        </div>
      </div>
    </section>
  );
}
