'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address, Abi } from 'viem';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import ProjectFactory from '../../contracts/ProjectFactory.json';
import RevenueBond from '../../contracts/RevenueBond.json';

const factoryAddress = '0x5a53fB9862021a8e6468fa47CF6a49cA858C8C87';

export default function AdminPage() {
  const { address: userAddress, isConnected } = useAccount();
  const [projectToWhitelist, setProjectToWhitelist] = useState<Address | ''>('');
  const [userToWhitelist, setUserToWhitelist] = useState('');
  
  const { data: factoryAdmin } = useReadContract({
    address: factoryAddress as Address,
    abi: ProjectFactory.abi as Abi,
    functionName: 'admin',
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const isAdmin = isConnected && userAddress?.toLowerCase() === (factoryAdmin as string)?.toLowerCase();

  const handleWhitelist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectToWhitelist || !userToWhitelist) return;

    writeContract({
      address: projectToWhitelist as Address,
      abi: RevenueBond.abi as Abi,
      functionName: 'addToWhitelist',
      args: [userToWhitelist as Address],
    });
  };

  return (
    <>
      <Header />
      <main>
        <div style={containerStyle}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>VERA Admin Panel</h1>
          
          {!isConnected && <p>Please connect your admin wallet.</p>}

          {isConnected && !isAdmin && (
            <p style={{color: '#ff6b6b'}}>Access Denied. This page is for protocol administrators only.</p>
          )}

          {isAdmin && (
            <form onSubmit={handleWhitelist} style={formStyle}>
              <h2 style={{marginTop: 0}}>Approve User for Project (KYC)</h2>
              <div style={{marginBottom: '1rem'}}>
                <label style={labelStyle}>Project Contract Address</label>
                <input style={inputStyle} type="text" value={projectToWhitelist} onChange={(e) => setProjectToWhitelist(e.target.value as Address)} placeholder="0x...ProjectAddress" required />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={labelStyle}>User Wallet Address to Whitelist</label>
                <input style={inputStyle} type="text" value={userToWhitelist} onChange={(e) => setUserToWhitelist(e.target.value)} placeholder="0x...UserAddress" required />
              </div>
              <button type="submit" style={buttonStyle} disabled={isPending}>
                {isPending ? 'Confirming...' : 'Approve & Whitelist User'}
              </button>
              {isConfirming && <p style={{marginTop: '1rem'}}>Processing transaction...</p>}
              {isConfirmed && <p style={{marginTop: '1rem', color: '#2ecc71'}}>✅ User whitelisted successfully!</p>}
              {error && <p style={{marginTop: '1rem', color: '#ff6b6b'}}>Error: {(error as any).shortMessage}</p>}
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

// --- STYLES ---
const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: 'var(--surface-color-2)',
    borderRadius: '16px',
};
const formStyle: React.CSSProperties = { width: '100%', maxWidth: '600px' };
const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' };
const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
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
};