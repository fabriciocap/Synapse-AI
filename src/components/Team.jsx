import React from "react";
import { useReveal } from "@/hooks/useReveal";

export default function Team() {
  const [tagRef, tagVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section className="team" id="equipe">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Quem constrói a Synapse</span>
          <h2>Os fundadores por trás do produto</h2>
          <p>Duas pessoas, um mesmo objetivo: tirar o atendimento manual do caminho das vendas.</p>
        </div>

        <div ref={gridRef} className={`team-grid reveal-stagger ${gridVisible ? "is-visible" : ""}`}>
          <div className="team-card">
            <div className="team-photo-wrap">
              <div className="team-photo">
                <img src="/img/fabricio.jpeg" alt="Foto de Fabrício Capeletti" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("placeholder"); }} />
                <span className="team-initials">FC</span>
              </div>
              <span className="team-ring"></span>
            </div>
            <b className="team-name">Fabrício Capeletti</b>
            <span className="team-role">Co-fundador &amp; Desenvolvimento</span>
            <p className="team-bio">
              [Espaço reservado: escreva aqui uma breve descrição sobre você — trajetória, foco na
              Synapse e o que te motivou a criar o produto.]
            </p>
            <div className="team-tags">
              <span>Front-end</span>
              <span>Produto</span>
            </div>
          </div>

          <div className="team-card">
            <div className="team-photo-wrap">
              <div className="team-photo placeholder">
                <span className="team-initials">CF</span>
              </div>
              <span className="team-ring"></span>
            </div>
            <b className="team-name">[Nome do co-fundador]</b>
            <span className="team-role">Co-fundador &amp; [Área]</span>
            <p className="team-bio">
              [Espaço reservado: escreva aqui uma breve descrição sobre o outro fundador —
              experiência, papel na empresa e o que ele traz para a Synapse.]
            </p>
            <div className="team-tags">
              <span>[Tag 1]</span>
              <span>[Tag 2]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
