import React, { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const FAQS = [
  { q: "Preciso saber programar para usar a Synapse?", a: "Não. A configuração é feita por um painel visual simples, sem necessidade de conhecimento técnico. Em poucos minutos a IA já está respondendo seus clientes." },
  { q: "A IA consegue manter o tom da minha marca?", a: "Sim. Você define o estilo, o vocabulário e as regras de atendimento, e a IA responde seguindo exatamente essas diretrizes." },
  { q: "Posso transferir a conversa para um atendente humano?", a: "Sim. A qualquer momento a conversa pode ser transferida para sua equipe, com todo o histórico já organizado no painel." },
  { q: "Funciona com o WhatsApp que eu já uso?", a: "Sim, a Synapse se conecta ao seu número atual através da API oficial do WhatsApp Business, sem precisar trocar de número." },
  { q: "Existe fidelidade ou multa de cancelamento?", a: "Não. Todos os planos podem ser cancelados a qualquer momento, sem multas ou taxas adicionais." },
];

export default function FAQ() {
  const [tagRef, tagVisible] = useReveal();
  const [listRef, listVisible] = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Perguntas frequentes</span>
          <h2>Tudo o que você precisa saber</h2>
        </div>
        <div ref={listRef} className={`faq-list reveal ${listVisible ? "is-visible" : ""}`}>
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                <button className="faq-q" onClick={() => setOpenIndex(isOpen ? null : i)}>
                  {item.q}<span className="plus"></span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? "240px" : 0 }}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
