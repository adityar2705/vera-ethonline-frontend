'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// The individual card for each pillar of the vision.
function VisionCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyleWithHover: React.CSSProperties = {
    ...cardStyle,
    transform: isHovered ? 'translateY(-5px)' : 'none',
    borderColor: isHovered ? 'var(--primary-accent)' : 'var(--border-color)',
  };

  return (
    <div 
      style={cardStyleWithHover}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={comingSoonBadgeStyle}>Future Protocol</div>
      <div style={iconContainerStyle}>
        {icon}
      </div>
      <h3 style={{ margin: '1rem 0 0.75rem', fontSize: '1.5rem', fontWeight: 600 }}>{title}</h3>
      <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
        {description}
      </p>
    </div>
  );
}

// SVG Icons for each pillar
const GovernanceIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M12 12v10"></path>
    </svg>
);
const TreasuryIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="12" rx="2"></rect><path d="M7 8v12"></path><path d="M17 8v12"></path><path d="M7 4h10"></path><path d="M12 4v4"></path>
    </svg>
);
const ProtocolIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2H9"></path><path d="M18 16h-1a2 2 0 0 1-2-2h-2a2 2 0 0 1-2 2H9"></path><path d="M6 12h.01"></path><path d="M12 12h.01"></path><path d="M18 12h.01"></path>
    </svg>
);

export function VisionSection() {
  return (
    <div style={containerStyle}>
      <div style={brandShowcaseCardStyle}>
          <div style={logoContainerStyle}>
            <Image 
              src="/logo-dark.png"
              alt="Urbane Digital Assets Logo"
              width={200} 
              height={200}
              priority
            />
          </div>
          <p style={introSubtitleStyle}>
            At <span style={brandNameStyle}>Urbane Digital Assets</span>, our philosophy is simple: the future of finance is tangible and transparent. 
            Our inaugural protocol, <span style={brandNameStyle}>VERA</span>, is the functioning, on-chain engine built to prove it. 
            We transform traditionally illiquid assets—like <span style={highlightTextStyle}>municipal revenue bonds</span>—into liquid, accessible digital tokens. 
            What you see today isn't a concept; it's a live demonstration of how we will fund the cities of tomorrow.
          </p>
      </div>

      <h3 style={pillarsTitleStyle}>The Protocol Pillars</h3>
      <div style={gridStyle}>
        <VisionCard
          icon={<GovernanceIcon />}
          title="Community Governance"
          description="VERA will transition to a decentralized protocol governed by token holders. Propose, vote on, and ratify new projects and protocol upgrades."
        />
        <VisionCard
          icon={<TreasuryIcon />}
          title="Protocol Treasury"
          description="A portion of protocol fees will be directed to a community-controlled treasury, creating a self-sustaining fund for public goods and ecosystem grants."
        />
        <VisionCard
          icon={<ProtocolIcon />}
          title="Permissionless Framework"
          description="An open framework will allow any municipality to launch a bond and any developer to build new financial products on top of VERA's infrastructure."
        />
      </div>
    </div>
  );
}

// --- STYLES ---

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  marginTop: '4rem',
  padding: '4rem 0',
  borderTop: '1px solid var(--border-color)',
  textAlign: 'center',
};

const brandShowcaseCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(44, 47, 54, 0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    padding: '3rem 2rem',
    marginBottom: '5rem',
};

const logoContainerStyle: React.CSSProperties = {
    display: 'inline-block',
    marginBottom: '2rem',
};

const brandNameStyle: React.CSSProperties = {
    fontWeight: 700,
    backgroundImage: 'linear-gradient(45deg, #CFB53B, #E6D3A3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
};

// --- THIS IS THE FIX ---
// The highlight is now a clean, bold white, removing color conflict.
const highlightTextStyle: React.CSSProperties = {
    fontWeight: 600,
    color: 'var(--text-primary)',
};

const introSubtitleStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    color: 'var(--text-secondary)',
    maxWidth: '850px',
    margin: '0 auto',
    lineHeight: 1.8,
};

const pillarsTitleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '2.5rem',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  textAlign: 'left',
};

const cardStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '2rem',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
  transition: 'background-color 0.2s, transform 0.2s, border-color 0.2s',
  overflow: 'hidden',
};

const iconContainerStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: 'var(--surface-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary-accent)',
};

const comingSoonBadgeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: 'var(--surface-color)',
  color: 'var(--secondary-accent)',
  padding: '0.25rem 0.75rem',
  borderRadius: '999px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  border: '1px solid var(--border-color)',
};

