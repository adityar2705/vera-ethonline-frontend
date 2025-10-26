'use client';

import { useReadContract } from 'wagmi';
import { Address, formatEther } from 'viem';
import RevenueBond from '../../contracts/RevenueBond.json';
import { InvestCard } from './InvestCard';
import { EtherscanLink } from './EtherscanLink';
import { Skeleton } from './Skeleton';

// Define the structure of the data we expect from getProjectStats
type ProjectStats = readonly [bigint, bigint, bigint, bigint, boolean, boolean];

const DetailsSkeleton = () => (
    <div style={containerStyle}>
        <div style={headerSectionStyle}>
            <Skeleton style={{height: '40px', width: '60%', margin: '0 auto 1rem'}} />
            <Skeleton style={{height: '24px', width: '80%', margin: '0 auto 1rem'}} />
            <Skeleton style={{height: '18px', width: '90%', margin: '0 auto'}} />
        </div>
        <div style={investCardSkeletonStyle}></div>
        <div style={statsGridStyle}>
            <Skeleton style={{height: '80px', width: '100%'}} />
            <Skeleton style={{height: '80px', width: '100%'}} />
            <Skeleton style={{height: '80px', width: '100%'}} />
            <Skeleton style={{height: '80px', width: '100%'}} />
            <Skeleton style={{height: '80px', width: '100%'}} />
            <Skeleton style={{height: '80px', width: '100%'}} />
        </div>
    </div>
);

// Crucially, this is a NAMED export, not a default one.
export function ProjectDetails({ address }: { address: Address }) {
  const { data: projectStats, isLoading: isLoadingStats } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'getProjectStats' });
  const { data: projectName, isLoading: isLoadingName } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'name' });
  const { data: projectDescription, isLoading: isLoadingDesc } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'projectDescription' });

  const isLoading = isLoadingStats || isLoadingName || isLoadingDesc;

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (!projectStats || !projectName || !projectDescription) {
    return <div>Could not load project data. Please check the address and try again.</div>;
  }

  const [
    totalRaised,
    fundingGoal,
    investorCount,
    interestRate,
    isFunded,
  ] = projectStats as ProjectStats;
  
  const progress = Number(fundingGoal) > 0 ? (Number(totalRaised) * 100) / Number(fundingGoal) : 0;

  return (
    <div style={containerStyle}>
      <div style={headerSectionStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{projectName as string}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{projectDescription as string}</p>
        <p style={{ fontFamily: 'monospace', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {address}
          <EtherscanLink type="address" address={address} />
        </p>
      </div>

      <InvestCard address={address} />

      <div style={statsGridStyle}>
        <StatCard title="Funding Progress" value={`${progress.toFixed(1)}%`} />
        <StatCard title="Total Raised" value={`${formatEther(totalRaised)} ETH`} />
        <StatCard title="Funding Goal" value={`${formatEther(fundingGoal)} ETH`} />
        <StatCard title="Investors" value={investorCount.toString()} />
        <StatCard title="Interest Rate" value={`${(Number(interestRate) / 100).toFixed(2)}%`} />
        <StatCard title="Status" value={isFunded ? 'Funded' : 'Active'} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div style={statCardStyle}>
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{title}</p>
      <p style={{ margin: '0.25rem 0 0', fontSize: '1.5rem', fontWeight: 600 }}>{value}</p>
    </div>
  );
}

// --- STYLES ---

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '900px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};

const headerSectionStyle: React.CSSProperties = {
  padding: '2rem',
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '24px',
  border: '1px solid var(--border-color)',
  textAlign: 'center',
};

const investCardSkeletonStyle: React.CSSProperties = {
    height: '250px',
    backgroundColor: 'rgba(44, 47, 54, 0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1rem',
};

const statCardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '1.5rem',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
};