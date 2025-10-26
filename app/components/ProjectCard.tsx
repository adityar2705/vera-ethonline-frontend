'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReadContract } from 'wagmi';
import { Address, formatEther } from 'viem';
import RevenueBond from '../../contracts/RevenueBond.json';
import { EtherscanLink } from './EtherscanLink';
import { Skeleton } from './Skeleton'; // 1. Import the new Skeleton component

type ProjectStats = readonly [bigint, bigint, bigint, bigint, boolean, boolean];

// A dedicated component for the loading state
const ProjectCardSkeleton = () => {
    return (
        <div style={cardStyle}>
            <Skeleton style={{ height: '28px', width: '70%', marginBottom: '8px' }} />
            <Skeleton style={{ height: '16px', width: '90%', marginBottom: '24px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Skeleton style={{ height: '14px', width: '100px' }} />
                <Skeleton style={{ height: '14px', width: '50px' }} />
            </div>
            <Skeleton style={{ height: '12px', width: '100%', borderRadius: '999px' }} />
            <Skeleton style={{ height: '14px', width: '120px', marginTop: '8px', marginLeft: 'auto' }} />
        </div>
    );
};

export function ProjectCard({ address }: { address: Address }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const { data: projectStats, isLoading: isLoadingStats } = useReadContract({
    address,
    abi: RevenueBond.abi,
    functionName: 'getProjectStats',
  });

  const { data: projectName, isLoading: isLoadingName } = useReadContract({
    address,
    abi: RevenueBond.abi,
    functionName: 'name',
  });

  const isLoading = isLoadingStats || isLoadingName;

  const handleCardClick = () => {
    router.push(`/project/${address}`);
  };

  // 2. Use the new Skeleton component when data is loading
  if (isLoading) {
    return <ProjectCardSkeleton />;
  }

  if (!projectStats || !projectName) {
    return <div style={cardStyle}>Could not load project data for {address}</div>;
  }

  const [_totalRaised, _fundingGoal] = projectStats as ProjectStats;
  const totalRaised = parseFloat(formatEther(_totalRaised));
  const fundingGoal = parseFloat(formatEther(_fundingGoal));
  const progress = fundingGoal > 0 ? (totalRaised / fundingGoal) * 100 : 0;

  const combinedCardStyle: React.CSSProperties = {
    ...cardStyle,
    transform: isHovered ? 'translateY(-5px)' : 'none',
    borderColor: isHovered ? 'var(--primary-accent)' : 'var(--border-color)',
    cursor: 'pointer',
  };

  return (
    <div 
        style={combinedCardStyle}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{projectName as string}</h3>
      <p style={{ margin: '4px 0 24px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
        {address} <EtherscanLink type="address" address={address} />
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Funding Progress</span>
        <span style={{ fontWeight: 'bold' }}>{progress.toFixed(1)}%</span>
      </div>

      <div style={progressBarContainerStyle}>
        <div style={{ ...progressBarStyle, width: `${progress}%` }}></div>
      </div>
      
      <p style={{ margin: '8px 0 0', textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <strong>{totalRaised.toFixed(3)} ETH</strong> / {fundingGoal.toFixed(2)} ETH
      </p>
    </div>
  );
}

// --- STYLES ---
const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '1.5rem',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
  transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out',
  cursor: 'pointer', // Keep this line
};

const progressBarContainerStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'var(--background-color)',
  borderRadius: '999px',
  height: '12px',
  overflow: 'hidden',
};

const progressBarStyle: React.CSSProperties = {
  backgroundColor: 'var(--primary-accent)',
  borderRadius: '999px',
  height: '100%',
  transition: 'width 0.3s ease-in-out',
};

