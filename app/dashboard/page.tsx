'use client';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dashboard } from '../components/Dashboard';
import { useAccount } from 'wagmi';

export default function DashboardPage() {
  const { isConnected } = useAccount();

  return (
    <>
      <Header />
      <main>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>My Portfolio</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            An overview of your investments and token holdings.
          </p>
        </div>
        
        {isConnected ? (
          <Dashboard />
        ) : (
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Please connect your wallet to view your dashboard.</p>
        )}
      </main>
      <Footer />
    </>
  );
}