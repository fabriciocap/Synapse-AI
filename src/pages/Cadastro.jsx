import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMismatch, setShowMismatch] = useState(false);

  function handleConfirmChange(value) {
    setConfirmPassword(value);
    setShowMismatch(password !== value && value.length > 0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const passwordsMatch = password === confirmPassword;
    setShowMismatch(!passwordsMatch);

    if (!form.checkValidity() || !passwordsMatch) {
      form.reportValidity();
      return;
    }

    alert("Cadastro de demonstração: aqui entrará a chamada para a API de criação de conta.");
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <Link to="/" className="checkout-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          Voltar para o site
        </Link>

        <div className="auth-wrap">
          <div className="checkout-card reveal is-visible auth-card">
            <div className="section-tag" style={{ marginBottom: 32, textAlign: "left", alignItems: "flex-start" }}>
              <span className="eyebrow">Criar conta</span>
              <h2 style={{ fontSize: 28 }}>Comece a automatizar seu atendimento</h2>
              <p style={{ margin: 0 }}>Leva menos de um minuto. Sem cartão de crédito.</p>
            </div>

            <form id="signupForm" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="fullName">Nome completo</label>
                <input type="text" id="fullName" name="fullName" placeholder="Seu nome" required />
              </div>

              <div className="form-row">
                <label htmlFor="company">Nome da empresa</label>
                <input type="text" id="company" name="company" placeholder="Nome da sua empresa (opcional)" />
              </div>

              <div className="form-row">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="voce@empresa.com" required />
              </div>

              <div className="form-row">
                <label htmlFor="whatsapp">WhatsApp Business</label>
                <input type="tel" id="whatsapp" name="whatsapp" placeholder="(00) 00000-0000" />
              </div>

              <div className="form-row-split">
                <div className="form-row">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password" id="password" name="password" placeholder="Mínimo 8 caracteres" required minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input
                    type="password" id="confirmPassword" name="confirmPassword" placeholder="Repita a senha" required minLength={8}
                    value={confirmPassword}
                    onChange={(e) => handleConfirmChange(e.target.value)}
                  />
                </div>
              </div>
              <span className="form-error" style={{ display: showMismatch ? "block" : "none" }}>
                As senhas não coincidem.
              </span>

              <label className="form-check">
                <input type="checkbox" id="terms" required />
                <span>Aceito os <a href="#">termos de uso</a> e a <a href="#">política de privacidade</a>.</span>
              </label>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 8 }}>
                Criar conta grátis
              </button>

              <div className="checkout-note">
                # TODO backend: conectar este formulário a um endpoint de autenticação/cadastro.<br />
                # Nenhum dado é enviado ainda — validação abaixo é só de front-end.
              </div>
            </form>

            <p className="auth-switch">Já tem conta? <a href="#">Entrar</a></p>
          </div>

          <div className="auth-side reveal is-visible">
            <h4>O que você ganha ao criar sua conta</h4>
            <ul className="auth-benefits">
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 13l4 4L18 7" /></svg>7 dias de teste grátis em qualquer plano</li>
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 13l4 4L18 7" /></svg>Configuração guiada em minutos</li>
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 13l4 4L18 7" /></svg>Suporte para conectar seu WhatsApp Business</li>
              <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 13l4 4L18 7" /></svg>Cancele quando quiser, sem multa</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
