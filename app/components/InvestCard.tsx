'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { parseEther, Address } from 'viem';
import RevenueBond from '../../contracts/RevenueBond.json';
import Link from 'next/link';
import { EtherscanLink } from './EtherscanLink'; // 1. Import the component

export function InvestCard({ address }: { address: Address }) {
  const [amount, setAmount] = useState('');
  const { isConnected, address: userAddress } = useAccount();

  const { data: isWhitelisted, isLoading: isLoadingWhitelist } = useReadContract({
    address,
    abi: RevenueBond.abi,
    functionName: 'isWhitelisted',
    args: [userAddress as Address],
    query: { enabled: !!userAddress },
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount) return;
    const parsedAmount = parseEther(amount as `${number}`);
    writeContract({
      address,
      abi: RevenueBond.abi,
      functionName: 'invest',
      value: parsedAmount,
    });
  }

  if (!isConnected) {
    return (
      <div style={investCardStyle}>
        <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>Please connect your wallet to invest.</p>
      </div>
    );
  }

  if (isLoadingWhitelist) {
    return (
        <div style={investCardStyle}>
            <p style={{textAlign: 'center', color: 'var(--text-secondary)'}}>Checking your verification status...</p>
        </div>
    );
  }

  if (!isWhitelisted) {
    return (
        <div style={investCardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.5rem' }}>Verification Required</h3>
            <p style={{textAlign: 'center', color: 'var(--text-secondary)', lineHeight: 1.6}}>
                Your verification request has been submitted. An admin must approve your address before you can invest in this project.
            </p>
        </div>
    );
  }
  
  return (
    <div style={investCardStyle}>
      <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem' }}>Invest in this Project</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="amount" style={labelStyle}>Amount (ETH)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.05"
            value={amount}
            style={inputStyle}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isPending || !amount} 
          style={isPending || !amount ? {...buttonStyle, ...buttonDisabledStyle} : buttonStyle}
        >
          {isPending ? 'Confirming in Wallet...' : 'Invest Now'}
        </button>
      </form>

      {hash && !isConfirmed && (
        <div style={feedbackStyle}>
            {isConfirming ? <p>⏳ Confirming transaction on the blockchain...</p> : <p>✅ Transaction Sent! Waiting for confirmation...</p>}
            {/* 2. Add the Etherscan link to the transaction hash */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.8rem'}}>
                {hash.slice(0, 6)}...{hash.slice(-4)} <EtherscanLink type="tx" address={hash} />
            </div>
        </div>
      )}

      {isConfirmed && (
        <div style={{...feedbackStyle, border: '1px solid var(--secondary-accent)'}}>
            <p style={{fontSize: '1.1rem', fontWeight: 600}}>🎉 Investment Confirmed!</p>
            <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Thank you for your support. Your new tokens are in your wallet.</p>
            <Link href="/dashboard" style={{...buttonStyle, display: 'inline-block', textDecoration: 'none', marginTop: '1rem', backgroundColor: 'var(--secondary-accent)'}}>
                View in My Portfolio
            </Link>
        </div>
      )}
      
      {error && (
        <div style={{...feedbackStyle, color: '#ff6b6b'}}>
          <p>Error: {(error as any).shortMessage || error.message}</p>
        </div>
      )}
    </div>
  );
}

// --- STYLES ---

const investCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--surface-color-2)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid var(--border-color)',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
};

const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'var(--primary-accent)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s, opacity 0.2s',
};

const buttonDisabledStyle: React.CSSProperties = {
    backgroundColor: 'var(--border-color)',
    cursor: 'not-allowed',
    opacity: 0.6,
};

const feedbackStyle: React.CSSProperties = {
  marginTop: '1.5rem', 
  textAlign: 'center', 
  padding: '1rem',
  borderRadius: '8px',
  backgroundColor: 'var(--surface-color)',
  border: '1px solid var(--border-color)'
};