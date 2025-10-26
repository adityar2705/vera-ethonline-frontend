'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useReadContract, useAccount, useWatchContractEvent } from 'wagmi';
import { Address, formatEther, Abi } from 'viem';
import RevenueBond from '../../contracts/RevenueBond.json';
import { TransferModal } from './TransferModal';
import { EtherscanLink } from './EtherscanLink';
import { Skeleton } from './Skeleton';

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div style={tooltipStyle}>{text}</div>}
    </div>
  );
}

const DashboardCardSkeleton = () => {
    return (
        <div style={cardStyle}>
            <Skeleton style={{ height: '28px', width: '60%', marginBottom: '8px' }} />
            <Skeleton style={{ height: '16px', width: '80%', marginBottom: '24px' }} />
            <div style={userStatsGridStyle}>
                <Skeleton style={{ height: '40px', width: '100%' }} />
                <Skeleton style={{ height: '40px', width: '100%' }} />
                <Skeleton style={{ height: '40px', width: '100%' }} />
                <Skeleton style={{ height: '40px', width: '100%' }} />
            </div>
            <div style={separatorStyle}></div>
            <div style={managementSectionStyle}>
                <Skeleton style={{ height: '32px', width: '120px' }} />
                <Skeleton style={{ height: '32px', width: '120px' }} />
            </div>
        </div>
    );
};

export function DashboardProjectCard({ address }: { address: Address }) {
  const router = useRouter();
  const { address: userAddress } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projectName, isLoading: isLoadingName } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'name' });
  const { data: tokenSymbol, isLoading: isLoadingSymbol } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'symbol' });
  const { data: userInvestmentData } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'investmentAmount', args: [userAddress!], query: { enabled: !!userAddress } });
  const { data: userBalanceData } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'balanceOf', args: [userAddress!], query: { enabled: !!userAddress } });
  const { data: expectedReturnsData } = useReadContract({ address, abi: RevenueBond.abi, functionName: 'calculateExpectedReturns', args: [userAddress!], query: { enabled: !!userAddress } });

  const { data: initialTotalRevenue, refetch: refetchTotalRevenue } = useReadContract({
    address,
    abi: RevenueBond.abi as Abi,
    functionName: 'totalRevenueDistributed',
  });

  const [liveTotalRevenue, setLiveTotalRevenue] = useState<bigint | undefined>();

  useEffect(() => {
    if (initialTotalRevenue !== undefined) {
      setLiveTotalRevenue(initialTotalRevenue as bigint);
    }
  }, [initialTotalRevenue]);

  useWatchContractEvent({
    address,
    abi: RevenueBond.abi as Abi,
    eventName: 'RevenueDistributed',
    onLogs(logs) {
      refetchTotalRevenue();
    },
  });

  const isLoading = isLoadingName || isLoadingSymbol;
  const userInvestment = userInvestmentData as bigint | undefined;
  const userBalance = userBalanceData as bigint | undefined;
  const expectedReturns = expectedReturnsData as bigint | undefined;

  const handleCardClick = () => {
    router.push(`/project/${address}`);
  };

  if (isLoading) {
    return <DashboardCardSkeleton />;
  }

  return (
    <>
      <div style={{...cardStyle, cursor: 'pointer'}} onClick={handleCardClick}>
          <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{projectName as string}</h3>
          <p style={{ margin: '4px 0 24px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
            {address} <EtherscanLink type="address" address={address} />
          </p>
          
          <div style={userStatsGridStyle}>
            <div>
                <p style={statLabelStyle}>My Investment</p>
                <p style={statValueStyle}>{userInvestment !== undefined ? `${formatEther(userInvestment)} ETH` : '...'}</p>
            </div>
            <div>
                <p style={statLabelStyle}>My Tokens</p>
                <p style={statValueStyle}>{userBalance !== undefined ? `${formatEther(userBalance)} ${tokenSymbol as string}` : '...'}</p>
            </div>
            <div>
                <p style={statLabelStyle}>Projected Yearly Returns (APY)</p>
                {/* --- THIS IS THE FIX --- */}
                <p style={{...statValueStyle, ...gradientTextStyle}}>{expectedReturns !== undefined ? `${formatEther(expectedReturns)} ETH` : '...'}</p>
            </div>
            <div>
                <p style={statLabelStyle}>Total Project Revenue</p>
                <p style={statValueStyle}>{liveTotalRevenue !== undefined ? `${formatEther(liveTotalRevenue)} ETH` : '...'}</p>
            </div>
          </div>
        
        <div style={separatorStyle}></div>
        <div style={managementSectionStyle}>
            <Tooltip text="On-chain revenue distribution and claiming will be enabled in V2 of the protocol.">
                <button style={disabledButtonStyle} onClick={(e) => e.stopPropagation()}>Claim Revenue</button>
            </Tooltip>
            
            <button 
                style={transferButtonStyle} 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                }}
            >
                Sell / Transfer
            </button>
        </div>
      </div>

      {isModalOpen && <TransferModal address={address} onClose={() => setIsModalOpen(false)} />}
    </>
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
};
const userStatsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
};
const statLabelStyle: React.CSSProperties = {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
};
const statValueStyle: React.CSSProperties = {
    margin: '0.25rem 0 0',
    fontSize: '1.25rem',
    fontWeight: 600,
};
const separatorStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '1.5rem 0',
};
const managementSectionStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};
const transferButtonStyle: React.CSSProperties = {
    backgroundColor: 'var(--primary-accent)',
    border: '1px solid var(--primary-accent)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.9rem',
};
const disabledButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontWeight: 500,
    fontSize: '0.9rem',
};
const tooltipStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '125%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(44, 47, 54, 0.8)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color: 'var(--text-primary)',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  zIndex: 10,
  width: '250px',
  textAlign: 'center',
  fontSize: '0.875rem',
  border: '1px solid var(--border-color)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
  pointerEvents: 'none',
};
// Make sure this style object is present
const gradientTextStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(45deg, #CFB53B, #E6D3A3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
};

