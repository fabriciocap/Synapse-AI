import React, { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const CHECKLIST_STEPS = [
  "Identificou a intenção da mensagem",
  "Consultou o catálogo / estoque",
  "Respondeu no tom da marca",
  "Ofereceu o próximo passo (link, prazo ou pagamento)",
];

const REPLIES_BY_KEYWORD = [
  { keys: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"], reply: "Oi! 👋 Que bom te ver por aqui. Me conta o que você precisa que eu te ajudo agora." },
  { keys: ["preço", "preco", "valor", "quanto custa", "custa"], reply: "Nossos produtos custam a partir de R$ 149. Posso te enviar o catálogo completo com todos os valores?" },
  { keys: ["frete", "entrega", "prazo", "chega"], reply: "O frete chega em até 5 dias úteis para todo o Brasil. Quer que eu calcule o prazo exato pro seu CEP?" },
  { keys: ["estoque", "disponível", "disponivel", "tem "], reply: "Deixa eu confirmar rapidinho... sim, temos em estoque! Posso já separar o seu pedido." },
  { keys: ["pagamento", "pix", "cartão", "cartao", "boleto"], reply: "Aceitamos Pix, cartão de crédito e boleto. Prefere qual forma de pagamento?" },
  { keys: ["obrigad", "valeu", "ok"], reply: "Eu que agradeço! Qualquer outra dúvida, é só chamar por aqui. 🙌" },
];

const AUTO_SCRIPT = [
  "Oi, vocês têm o vestido azul no tamanho M?",
  "Beleza! E qual o prazo de entrega pra Porto Alegre?",
  "Fechado, como faço o pagamento?",
];

function pickReply(text) {
  const lower = text.toLowerCase();
  for (const group of REPLIES_BY_KEYWORD) {
    if (group.keys.some((k) => lower.includes(k))) return group.reply;
  }
  return "Entendi! Vou verificar isso e te retorno em instantes. Enquanto isso, quer saber sobre preço, entrega ou formas de pagamento?";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let bubbleId = 0;

export default function Demo() {
  const [tagRef, tagVisible] = useReveal();
  const [shellRef, shellVisible] = useReveal();

  const [messages, setMessages] = useState([]); // {id, who: 'client'|'ai', text}
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [displayedTime, setDisplayedTime] = useState(null);

  const bodyRef = useRef(null);
  const isPlayingRef = useRef(false); // avoids stale-closure issues inside async loops

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  // Animate the "tempo médio de resposta" number counting down/up smoothly
  useEffect(() => {
    if (exchangeCount === 0) return;
    const target = Math.max(3, 9 - exchangeCount);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 20));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setDisplayedTime(current);
      if (current >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [exchangeCount]);

  function addBubble(text, who) {
    bubbleId += 1;
    setMessages((prev) => [...prev, { id: bubbleId, who, text }]);
  }

  async function respondTo(text) {
    addBubble(text, "client");
    setExchangeCount((c) => c + 1);
    setTyping(true);
    await sleep(700 + Math.random() * 600);
    setTyping(false);
    addBubble(pickReply(text), "ai");
    setExchangeCount((c) => c + 1);
  }

  function sendFromInput() {
    if (isPlayingRef.current) return;
    const text = input.trim();
    if (!text) return;
    setInput("");
    respondTo(text);
  }

  async function playAuto() {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setIsPlaying(true);

    for (const message of AUTO_SCRIPT) {
      addBubble(message, "client");
      setExchangeCount((c) => c + 1);
      setTyping(true);
      await sleep(900);
      setTyping(false);
      addBubble(pickReply(message), "ai");
      setExchangeCount((c) => c + 1);
      await sleep(900);
    }

    isPlayingRef.current = false;
    setIsPlaying(false);
  }

  const doneCount = Math.min(exchangeCount, CHECKLIST_STEPS.length);
  const satisfaction =
    exchangeCount >= 3 ? "😀 Alta" : exchangeCount === 2 ? "🙂 Boa" : exchangeCount > 0 ? "⏳ Em andamento" : "—";

  return (
    <section className="demo" id="demo">
      <div className="container">
        <div ref={tagRef} className={`section-tag reveal ${tagVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Experimente</span>
          <h2>Converse com a IA da Synapse agora mesmo</h2>
          <p>Digite uma mensagem como se fosse cliente, ou veja uma conversa completa simulada.</p>
        </div>

        <div ref={shellRef} className={`demo-shell reveal ${shellVisible ? "is-visible" : ""}`}>
          <div className="demo-bar"><span></span><span></span><span></span></div>

          <div className="demo-interactive" style={{ padding: 20 }}>
            <div className="chat-window">
              <div className="chat-window-top">
                <span className="chat-window-avatar">IA</span>
                <div className="chat-window-info">
                  <b>Synapse Atendimento</b>
                  <span className="chat-window-status"><i></i>online agora</span>
                </div>
                <button className="btn btn-outline chat-autoplay" onClick={playAuto} disabled={isPlaying}>
                  {isPlaying ? "Simulando…" : "▶ Simular atendimento"}
                </button>
              </div>

              <div className="chat-window-body" ref={bodyRef}>
                {messages.length === 0 && !typing && (
                  <p style={{ color: "var(--gray-700)", fontSize: 13, textAlign: "center", margin: "auto" }}>
                    Escolha "Simular atendimento" ou digite uma mensagem abaixo para começar.
                  </p>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`chat-bubble demo-msg ${m.who === "client" ? "chat-out" : "chat-in"}`}>
                    <p>{m.text}</p>
                  </div>
                ))}
                {typing && (
                  <div className="chat-typing demo-typing"><span></span><span></span><span></span></div>
                )}
              </div>

              <div className="chat-window-input">
                <input
                  type="text"
                  placeholder="Digite como se fosse o cliente..."
                  value={input}
                  disabled={isPlaying}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendFromInput()}
                />
                <button aria-label="Enviar" onClick={sendFromInput} disabled={isPlaying}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="demo-results-panel">
              <h4>Resultados da conversa</h4>
              <div className="result-stats">
                <div className="result-stat">
                  <b>{exchangeCount}</b>
                  <span>Mensagens respondidas</span>
                </div>
                <div className="result-stat">
                  <b>{displayedTime !== null ? `${displayedTime}s` : "—"}</b>
                  <span>Tempo médio de resposta</span>
                </div>
                <div className="result-stat">
                  <b>{satisfaction}</b>
                  <span>Satisfação estimada</span>
                </div>
              </div>
              <ul className="result-checklist">
                {CHECKLIST_STEPS.map((step, i) => (
                  <li key={step} data-done={i < doneCount ? "true" : "false"}>
                    <span className="check-dot"></span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
