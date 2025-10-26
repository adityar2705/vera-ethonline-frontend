'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Playfair_Display } from 'next/font/google';
import Link from 'next/link';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
});

export function Header() {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={logoContainerStyle}>
              <span style={veraLogoStyle}>VERA</span>
              <span style={{ fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '10px', fontSize: '0.9rem' }}>by Urbane Digital Assets</span>
            </div>
          </Link>
          <nav style={{display: 'flex', gap: '1rem'}}>
            <Link href="/dashboard" style={navLinkStyle}>
              My Portfolio
            </Link>
            <Link href="/verify" style={navLinkStyle}>
              Verify Identity
            </Link>
          </nav>
        </div>
        <ConnectButton />
      </div>
    </header>
  );
}

// --- STYLES ---

const veraLogoStyle: React.CSSProperties = {
  fontFamily: playfair.style.fontFamily,
  fontSize: '1.75rem',
  backgroundImage: 'linear-gradient(45deg, #CFB53B, #E6D3A3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

const headerStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem 1.5rem',
  backgroundColor: 'rgba(30, 30, 30, 0.5)', // Semi-transparent
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderBottom: '1px solid var(--border-color)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
};

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoContainerStyle: React.CSSProperties = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const navLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: 'var(--text-secondary)',
  fontWeight: 500,
  fontSize: '1rem',
  transition: 'color 0.2s',
  padding: '0.5rem',
};