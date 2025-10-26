'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Link from 'next/link';
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit';

export default function VerifyPage() {
  const { isConnected, address } = useAccount();
  const [status, setStatus] = useState<'idle' | 'pending' | 'verifying' | 'submitted'>('idle');

  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && /`DialogContent` requires a `DialogTitle`/.test(args[0])) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    if (address) {
      const storedStatus = localStorage.getItem(`kyc_status_${address}`);
      if (storedStatus === 'submitted') {
        setStatus('submitted');
      }
    }
  }, [address]);

  const handleProof = (result: ISuccessResult) => {
    console.log("World ID Proof Received:", result);
    if (address) {
        localStorage.setItem(`kyc_status_${address}`, 'submitted');
        setStatus('submitted');
    }
  };

  const getVerificationComponent = () => {
    switch(status) {
        case 'idle':
            return (
                <IDKitWidget
                    app_id="app_staging_5db6f0023bad97df254727e305c9338a"
                    action="verify-vera-investor"
                    onSuccess={handleProof}
                >
                    {({ open }) => 
                        <button onClick={open} style={buttonStyle}>
                            Begin Verification with World ID
                        </button>
                    }
                </IDKitWidget>
            );
        case 'submitted':
            return (
                <div style={{textAlign: 'center'}}>
                    <p style={{color: '#2ecc71', fontSize: '1.2rem'}}>✅ Your request has been submitted.</p>
                    <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>An administrator will review your application shortly.</p>
                    <Link href="/dashboard" style={{...buttonStyle, display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none'}}>
                        Back to Portfolio
                    </Link>
                </div>
            );
        default: return null;
    }
  }

  return (
    <>
      <Header />
      <main>
        <div style={containerStyle}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Identity Verification (PoP)</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', textAlign: 'center', marginBottom: '2rem' }}>
            To ensure fairness and regulatory compliance, VERA uses World ID for privacy-preserving Proof of Personhood.
          </p>
          {!isConnected && <p style={{color: 'var(--text-secondary)'}}>Please connect your wallet to begin.</p>}
          {isConnected && getVerificationComponent()}
        </div>
      </main>
      <Footer />
    </>
  );
}

// --- STYLES ---
// FIX: Updated style for a transparent, "frosted glass" look
const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3rem',
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '24px',
  border: '1px solid var(--border-color)',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: 'var(--primary-accent)',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'background-color 0.2s',
};

