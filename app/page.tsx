'use client';

import { useAccount } from 'wagmi';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectList } from './components/ProjectList';
import { VisionSection } from './components/VisionSection';
import { HowItWorksSection } from './components/HowItWorksSection';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <Header />
      <main>
        <div style={heroContainerStyle}>
          <h1 style={heroTitleStyle}>Infrastructure, Reimagined.</h1>
          <p style={heroSubtitleStyle}>
            From <span style={brandNameStyle}>Urbane Digital Assets</span>, VERA is the on-chain engine for funding the cities of tomorrow. We transform municipal revenue bonds into transparent, liquid, and globally accessible digital assets.
          </p>
          <a href="#live-projects" style={ctaButtonStyle}>
            View Live Projects
          </a>
        </div>

        <HowItWorksSection />

        <div id="live-projects" style={projectsContainerStyle}>
            <h2 style={sectionTitleStyle}>Live Investment Opportunities</h2>
            {isConnected ? (
                <ProjectList />
            ) : (
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Please connect your wallet to view available projects.</p>
            )}
        </div>

        <VisionSection />

      </main>
      <Footer />
    </>
  );
}


// --- STYLES FOR THE NEW LAYOUT ---

const heroContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '4rem 0 6rem',
    width: '100%',
};

const heroTitleStyle: React.CSSProperties = {
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: '1.5rem',
    letterSpacing: '-2px',
};

const heroSubtitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    maxWidth: '750px',
    margin: '0 auto 2.5rem',
    lineHeight: 1.7,
};

// FIX: Updated this style to match the golden gradient
const brandNameStyle: React.CSSProperties = {
    fontWeight: 700,
    backgroundImage: 'linear-gradient(45deg, #CFB53B, #E6D3A3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
};

const ctaButtonStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: 'var(--primary-accent)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'transform 0.2s, background-color 0.2s',
};

const projectsContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1200px',
    padding: '4rem 0',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const sectionTitleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '3rem',
    textAlign: 'center',
};

