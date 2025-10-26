'use client';

import React, { useState } from 'react';

// A more advanced, iconic card for our "How It Works" steps
function StepCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyleWithHover: React.CSSProperties = {
      ...cardStyle,
      borderColor: isHovered ? 'var(--border-color)' : 'transparent',
      transform: isHovered ? 'translateY(-5px)' : 'none',
    };

    return (
        <div 
            style={cardStyleWithHover}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={iconContainerStyle}>{icon}</div>
            <h3 style={cardTitleStyle}>{title}</h3>
            <p style={cardDescriptionStyle}>{description}</p>
        </div>
    );
}

// --- NEW SVG ICONS FOR EACH STEP ---
const VerifyIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);
const InvestIcon = () => (
     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);
const ManageIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"></path>
        <path d="M18.7 8a2 2 0 0 1 0 2.8l-6 6-3 3-3-3 6-6a2 2 0 0 1 2.8 0z"></path>
    </svg>
);


export function HowItWorksSection() {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>A New Model for Civic Funding</h2>
      <div style={gridStyle}>
        <StepCard 
            icon={<VerifyIcon />} 
            title="Verify Your Identity" 
            description="Use our privacy-preserving World ID integration to prove your personhood and get whitelisted for investment."
        />
        <StepCard 
            icon={<InvestIcon />} 
            title="Invest in Projects" 
            description="Browse live, vetted municipal revenue bonds. Invest directly on-chain and receive project tokens representing your stake."
        />
        <StepCard 
            icon={<ManageIcon />} 
            title="Manage Your Portfolio" 
            description="Track your investments, view projected returns, and manage your assets in your personal dashboard."
        />
      </div>
    </div>
  );
}

// --- STYLES ---

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  padding: '4rem 0',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '3rem',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  textAlign: 'center',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '2.5rem 2rem', // Keep the original padding
  borderRadius: '16px',
  border: '1px solid transparent',
  transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
};
const iconContainerStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--surface-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    border: '1px solid var(--border-color)',
    color: 'var(--primary-accent)',
};

const cardTitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
};

const cardDescriptionStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    fontSize: '0.95rem',
};

