// Carrinho de demonstração — sem integração de backend ainda.
// TODO: no botão #finalizeBtn, substituir o alert() por uma chamada real
// para a API do gateway de pagamento (ex.: Mercado Pago) quando o back-end estiver pronto.

const EXTRA_NUMBER_PRICE = 89; // preço fictício por número extra de WhatsApp

const planNames = {
  starter: 'Plano Starter',
  professional: 'Plano Professional',
  enterprise: 'Plano Enterprise'
};

const params = new URLSearchParams(window.location.search);
const requestedPlan = params.get('plano');

const planOptions = document.querySelectorAll('.plan-option');
const qtyValueEl = document.getElementById('qtyValue');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const payMethods = document.querySelectorAll('.pay-method');
const finalizeBtn = document.getElementById('finalizeBtn');

const summaryPlanName = document.getElementById('summaryPlanName');
const summaryPlanPrice = document.getElementById('summaryPlanPrice');
const summaryExtras = document.getElementById('summaryExtras');
const summaryMethod = document.getElementById('summaryMethod');
const summaryTotal = document.getElementById('summaryTotal');

let qty = 0; // números extras
let selectedMethod = 'pix';

function formatBRL(value) {
  return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getSelectedPlan() {
  return document.querySelector('.plan-option.selected');
}

function updateSummary() {
  const selected = getSelectedPlan();
  if (!selected) return;

  const planKey = selected.dataset.plan;
  const price = Number(selected.dataset.price) || 0;
  const isEnterprise = planKey === 'enterprise';

  summaryPlanName.textContent = planNames[planKey] || 'Plano';
  summaryPlanPrice.textContent = isEnterprise ? 'Sob consulta' : formatBRL(price);

  const extrasTotal = qty * EXTRA_NUMBER_PRICE;
  summaryExtras.textContent = isEnterprise ? '—' : formatBRL(extrasTotal);

  summaryMethod.textContent = {
    pix: 'Pix',
    cartao: 'Cartão de crédito',
    boleto: 'Boleto'
  }[selectedMethod];

  summaryTotal.textContent = isEnterprise ? 'Sob consulta' : formatBRL(price + extrasTotal);
}

// Seleção de plano
planOptions.forEach(option => {
  if (requestedPlan && option.dataset.plan === requestedPlan) {
    planOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    option.querySelector('input').checked = true;
  }
  option.addEventListener('click', () => {
    planOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    option.querySelector('input').checked = true;
    updateSummary();
  });
});

// Quantidade de números extras
if (qtyMinus && qtyPlus && qtyValueEl) {
  qtyMinus.addEventListener('click', () => {
    qty = Math.max(0, qty - 1);
    qtyValueEl.textContent = qty;
    updateSummary();
  });
  qtyPlus.addEventListener('click', () => {
    qty = Math.min(20, qty + 1);
    qtyValueEl.textContent = qty;
    updateSummary();
  });
}

// Forma de pagamento
payMethods.forEach(method => {
  method.addEventListener('click', () => {
    payMethods.forEach(m => m.classList.remove('selected'));
    method.classList.add('selected');
    selectedMethod = method.dataset.method;
    updateSummary();
  });
});

// Botão de finalizar (mock — sem chamada de API ainda)
if (finalizeBtn) {
  finalizeBtn.addEventListener('click', () => {
    alert('Carrinho de demonstração: aqui entrará a chamada para a API de pagamento (ex.: Mercado Pago).');
  });
}

updateSummary();