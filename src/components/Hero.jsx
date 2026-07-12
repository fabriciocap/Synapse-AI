import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">IA para WhatsApp Business</span>
          <h1>
            Transforme mensagens em <span className="grad">clientes automaticamente</span>
          </h1>
          <p className="lead">
            Nossa IA responde clientes 24 horas por dia, organiza contatos e economiza tempo da
            sua empresa — sem perder o tom da sua marca.
          </p>
          <div className="hero-actions">
            <a href="/checkout?plano=professional">
              <InteractiveHoverButton text="Testar grátis" className="ihb-lg" />
            </a>
            <a href="#demo" className="btn btn-outline btn-lg">Ver demonstração</a>
          </div>
          <p className="trial-note">
            7 dias grátis em qualquer plano · sem cartão de crédito · cancele quando quiser
          </p>
          <div className="hero-proof">
            <div className="avatars"><div></div><div></div><div></div><div></div></div>
            <small><strong>+2.400 empresas</strong> já automatizaram o atendimento</small>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dash-card">
            <div className="dash-top">
              <div className="dash-dots"><span></span><span></span><span></span></div>
              <span className="dash-title">Synapse · painel em tempo real</span>
            </div>
            <div className="dash-stats">
              <div className="dash-stat"><b>1.284</b><span>Conversas hoje</span></div>
              <div className="dash-stat"><b>98%</b><span>Taxa de resposta</span></div>
              <div className="dash-stat"><b>4min</b><span>Tempo médio</span></div>
            </div>
            <div className="dash-chart">
              {[40, 65, 35, 80, 55, 90, 70, 50].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }}></i>
              ))}
            </div>
          </div>

          <div className="chat-card">
            <div className="chat-card-top">
              <span className="chat-status-dot"></span>
              <span className="chat-card-title">Respondendo agora</span>
            </div>
            <div className="chat-bubble chat-in">
              <p>Oi! Vocês têm o tênis 42 em estoque?</p>
            </div>
            <div className="chat-bubble chat-out">
              <p>Temos sim! 🙌 Consigo separar o par 42 e te mandar o link do pagamento agora.</p>
              <span className="chat-time">agora · via Synapse</span>
            </div>
            <div className="chat-typing"><span></span><span></span><span></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
