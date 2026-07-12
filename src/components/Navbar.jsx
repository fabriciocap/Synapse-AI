import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#equipe", label: "Equipe" },
  { href: "#demo", label: "Demonstração" },
  { href: "#precos", label: "Preços" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    if (!onHome) return; // other pages keep the "scrolled" style permanently
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const linkHref = (href) => (onHome ? href : `/${href}`);

  return (
    <>
      <nav className={`navbar ${scrolled || !onHome ? "scrolled" : ""}`} id="navbar">
        <div className="container nav-inner">
          <Link to="/" className="logo">
            <span className="logo-mark"></span>Synapse
          </Link>

          {onHome && (
            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}

          <div className="nav-actions">
            {onHome ? (
              <a href="#" className="btn btn-ghost">Entrar</a>
            ) : (
              <Link to="/" className="btn btn-ghost">Voltar ao site</Link>
            )}
            <Link to="/cadastro" className="btn btn-secondary">Cadastrar</Link>
            {onHome && <a href="#precos" className="btn btn-primary">Teste grátis</a>}
            <Link to="/checkout" className={`nav-cart ${!onHome ? "active" : ""}`} aria-label="Ver carrinho">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="21" r="1.4" /><circle cx="18" cy="21" r="1.4" />
                <path d="M2.5 3h2.4l2.3 12.1a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21.5 7H6" />
              </svg>
              <span className="nav-cart-badge">1</span>
            </Link>
            <button
              className={`nav-toggle ${menuOpen ? "open" : ""}`}
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {onHome &&
          NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        {onHome ? (
          <a href="#" className="btn btn-outline">Entrar</a>
        ) : (
          <Link to="/" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Voltar ao site</Link>
        )}
        <Link to="/cadastro" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Cadastrar</Link>
        {onHome && (
          <a href="#precos" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Teste grátis</a>
        )}
      </div>
    </>
  );
}
