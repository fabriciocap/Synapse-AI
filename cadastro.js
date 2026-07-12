// Formulário de cadastro — validação apenas de front-end.
// TODO backend: substituir o preventDefault + alert por uma chamada real
// para o endpoint de criação de conta quando o back-end estiver pronto.

const signupForm = document.getElementById('signupForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const passwordsMatch = password.value === confirmPassword.value;
    passwordError.style.display = passwordsMatch ? 'none' : 'block';

    if (!signupForm.checkValidity() || !passwordsMatch) {
      signupForm.reportValidity();
      return;
    }

    alert('Cadastro de demonstração: aqui entrará a chamada para a API de criação de conta.');
  });

  confirmPassword.addEventListener('input', () => {
    passwordError.style.display = password.value === confirmPassword.value ? 'none' : 'block';
  });
}