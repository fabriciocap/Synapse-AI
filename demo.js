// Demonstração interativa da seção #demo.
// Isto é só front-end: as respostas da IA são simuladas com regras simples de palavra-chave,
// só para ilustrar a experiência. Nada disso chama uma IA de verdade.

(function () {
  const chatBody = document.getElementById('chatWindowBody');
  const chatInput = document.getElementById('chatWindowInput');
  const chatSend = document.getElementById('chatWindowSend');
  const autoplayBtn = document.getElementById('chatAutoplay');
  const resTime = document.getElementById('resTime');
  const resMsgs = document.getElementById('resMsgs');
  const resSatisfaction = document.getElementById('resSatisfaction');
  const resChecklist = document.getElementById('resChecklist');

  if (!chatBody || !chatInput || !chatSend) return; // seção não presente nesta página

  let exchangeCount = 0;
  let isPlaying = false;

  const checklistSteps = [
    'Identificou a intenção da mensagem',
    'Consultou o catálogo / estoque',
    'Respondeu no tom da marca',
    'Ofereceu o próximo passo (link, prazo ou pagamento)'
  ];

  const repliesByKeyword = [
    { keys: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'], reply: 'Oi! 👋 Que bom te ver por aqui. Me conta o que você precisa que eu te ajudo agora.' },
    { keys: ['preço', 'preco', 'valor', 'quanto custa', 'custa'], reply: 'Nossos produtos custam a partir de R$ 149. Posso te enviar o catálogo completo com todos os valores?' },
    { keys: ['frete', 'entrega', 'prazo', 'chega'], reply: 'O frete chega em até 5 dias úteis para todo o Brasil. Quer que eu calcule o prazo exato pro seu CEP?' },
    { keys: ['estoque', 'disponível', 'disponivel', 'tem '], reply: 'Deixa eu confirmar rapidinho... sim, temos em estoque! Posso já separar o seu pedido.' },
    { keys: ['pagamento', 'pix', 'cartão', 'cartao', 'boleto'], reply: 'Aceitamos Pix, cartão de crédito e boleto. Prefere qual forma de pagamento?' },
    { keys: ['obrigad', 'valeu', 'ok'], reply: 'Eu que agradeço! Qualquer outra dúvida, é só chamar por aqui. 🙌' }
  ];

  function pickReply(text) {
    const lower = text.toLowerCase();
    for (const group of repliesByKeyword) {
      if (group.keys.some(k => lower.includes(k))) return group.reply;
    }
    return 'Entendi! Vou verificar isso e te retorno em instantes. Enquanto isso, quer saber sobre preço, entrega ou formas de pagamento?';
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addBubble(text, who) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble demo-msg ' + (who === 'client' ? 'chat-out' : 'chat-in');
    const p = document.createElement('p');
    p.textContent = text;
    bubble.appendChild(p);
    chatBody.appendChild(bubble);
    scrollToBottom();
  }

  function addTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing demo-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    scrollToBottom();
    return typing;
  }

  function updateChecklist() {
    const doneCount = Math.min(exchangeCount, checklistSteps.length);
    resChecklist.innerHTML = '';
    checklistSteps.forEach((step, i) => {
      const li = document.createElement('li');
      li.dataset.done = i < doneCount ? 'true' : 'false';
      li.innerHTML = '<span class="check-dot"></span>' + step;
      resChecklist.appendChild(li);
    });
  }

  function animateCount(el, target, suffix) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 20));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  function updateResults() {
    exchangeCount += 1;
    resMsgs.textContent = exchangeCount;
    animateCount(resTime, Math.max(3, 9 - exchangeCount), 's');
    resSatisfaction.textContent = exchangeCount >= 3 ? '😀 Alta' : exchangeCount === 2 ? '🙂 Boa' : '⏳ Em andamento';
    updateChecklist();
  }

  function respondTo(text) {
    addBubble(text, 'client');
    updateResults();
    const typing = addTyping();
    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      typing.remove();
      addBubble(pickReply(text), 'ai');
      updateResults();
    }, delay);
  }

  function sendFromInput() {
    if (isPlaying) return;
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    respondTo(text);
  }

  chatSend.addEventListener('click', sendFromInput);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendFromInput();
  });

  // Simulação automática (roteiro pré-definido)
  const script = [
    'Oi, vocês têm o vestido azul no tamanho M?',
    'Beleza! E qual o prazo de entrega pra Porto Alegre?',
    'Fechado, como faço o pagamento?'
  ];

  function playAuto() {
    if (isPlaying) return;
    isPlaying = true;
    autoplayBtn.disabled = true;
    autoplayBtn.textContent = 'Simulando…';

    let i = 0;
    function next() {
      if (i >= script.length) {
        isPlaying = false;
        autoplayBtn.disabled = false;
        autoplayBtn.textContent = '▶ Simular atendimento';
        return;
      }
      const message = script[i];
      i += 1;
      addBubble(message, 'client');
      updateResults();
      const typing = addTyping();
      setTimeout(() => {
        typing.remove();
        addBubble(pickReply(message), 'ai');
        updateResults();
        setTimeout(next, 900);
      }, 900);
    }
    next();
  }

  if (autoplayBtn) autoplayBtn.addEventListener('click', playAuto);

  updateChecklist();
})();