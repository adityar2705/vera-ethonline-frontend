'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { parseEther, Address, formatEther } from 'viem';
import RevenueBond from '../../contracts/RevenueBond.json';
import { EtherscanLink } from './EtherscanLink'; // 1. Import the component

export function TransferModal({ address, onClose }: { address: Address; onClose: () => void; }) {
  const { address: userAddress } = useAccount();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const { data: balanceData } = useReadContract({
    address,
    abi: RevenueBond.abi,
    functionName: 'balanceOf',
    args: [userAddress as Address],
    query: { enabled: !!userAddress }
  });
  const balance = balanceData as bigint | undefined;

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!amount || !recipient) return;
    const parsedAmount = parseEther(amount as `${number}`);
    writeContract({
      address,
      abi: RevenueBond.abi,
      functionName: 'transfer',
      args: [recipient as Address, parsedAmount],
    });
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Transfer Asset</h3>
            <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        </div>
        <p style={{color: 'var(--text-secondary)', marginTop: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem'}}>
            Your Balance: <strong>{balance !== undefined ? formatEther(balance) : 'Loading...'} Tokens</strong>
        </p>
        
        <form onSubmit={submit} style={{marginTop: '1.5rem'}}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="recipient" style={labelStyle}>Recipient Address</label>
            <input
              id="recipient"
              type="text"
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              value={recipient}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="amount" style={labelStyle}>Amount to Transfer</label>
            <input
              id="amount"
              type="number"
              step="any"
              min="0"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              value={amount}
              style={inputStyle}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending || !amount || !recipient} 
            style={isPending || !amount || !recipient ? {...buttonStyle, ...buttonDisabledStyle} : buttonStyle}
          >
            {isPending ? 'Confirm in Wallet...' : 'Confirm Transfer'}
          </button>
        </form>

        {hash && !isConfirmed && (
            <div style={feedbackStyle}>
                {isConfirming ? <p>⏳ Confirming transaction...</p> : <p>✅ Transaction Sent! Waiting for confirmation...</p>}
                {/* 2. Add the Etherscan link to the transaction hash */}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.8rem'}}>
                    {hash.slice(0, 6)}...{hash.slice(-4)} <EtherscanLink type="tx" address={hash} />
                </div>
            </div>
        )}

        {isConfirmed && <div style={{...feedbackStyle, border: '1px solid #2ecc71'}}><p>🎉 Transfer Confirmed!</p></div>}
        
        {error && (
          <div style={{...feedbackStyle, color: '#ff6b6b', border: '1px solid #ff6b6b'}}>
            <p>Error: {(error as any).shortMessage || error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- STYLES ---

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(18, 18, 18, 0.5)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'rgba(44, 47, 54, 0.8)',
  borderRadius: '16px',
  padding: '2rem',
  border: '1px solid var(--border-color)',
  width: '100%',
  maxWidth: '500px',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
};

const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '1.5rem',
    cursor: 'pointer'
};

const labelStyle: React.CSSProperties = { 
    display: 'block', 
    marginBottom: '0.5rem', 
    color: 'var(--text-secondary)' 
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