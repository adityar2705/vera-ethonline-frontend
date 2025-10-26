'use client';

import { useAccount, useReadContracts } from 'wagmi';
import ProjectFactory from '../../contracts/ProjectFactory.json';
import RevenueBond from '../../contracts/RevenueBond.json';
import { Address, Abi, formatEther } from 'viem';
import { DashboardProjectCard } from './DashboardProjectCard';
import { PortfolioSummary } from './PortfolioSummary';

const factoryAddress = '0x5a53fB9862021a8e6468fa47CF6a49cA858C8C87';
const CHART_COLORS = ['#007BFF', '#2ECC71', '#FFC107', '#E83E8C', '#17A2B8'];

export function Dashboard() {
  const { address: userAddress } = useAccount();

  const { data: allProjectsData, isLoading: isLoadingProjects } = useReadContracts({
    contracts: [{
        address: factoryAddress as Address,
        abi: ProjectFactory.abi as Abi,
        functionName: 'getAllProjects',
    }]
  });

  const projects = allProjectsData?.[0].status === 'success' ? allProjectsData[0].result as Address[] : [];

  const projectContracts = projects?.flatMap(p => [
    { address: p, abi: RevenueBond.abi as Abi, functionName: 'name' },
    { address: p, abi: RevenueBond.abi as Abi, functionName: 'balanceOf', args: [userAddress!] },
    { address: p, abi: RevenueBond.abi as Abi, functionName: 'investmentAmount', args: [userAddress!] },
    { address: p, abi: RevenueBond.abi as Abi, functionName: 'calculateExpectedReturns', args: [userAddress!] }
  ]);

  const { data: projectData, isLoading: isLoadingData } = useReadContracts({
    contracts: projectContracts,
    query: { enabled: !!projects && projects.length > 0 && !!userAddress }
  });

  let totalInvested = 0;
  let totalProjectedReturn = 0;
  const ownedProjects: Address[] = [];
  const chartData: { label: string; value: number; color: string; }[] = [];

  if (projectData) {
    for (let i = 0; i < projects.length; i++) {
      const balance = projectData[i * 4 + 1];
      if (balance?.status === 'success' && (balance.result as bigint) > BigInt(0)) {
        ownedProjects.push(projects[i]);

        const name = projectData[i * 4];
        const investment = projectData[i * 4 + 2];
        const expectedReturn = projectData[i * 4 + 3];

        const investmentEth = investment?.status === 'success' ? parseFloat(formatEther(investment.result as bigint)) : 0;
        totalInvested += investmentEth;
        totalProjectedReturn += expectedReturn?.status === 'success' ? parseFloat(formatEther(expectedReturn.result as bigint)) : 0;
        
        chartData.push({
            label: name?.status === 'success' ? (name.result as string).split(' ')[0] : `Project ${i+1}`,
            value: investmentEth,
            color: CHART_COLORS[i % CHART_COLORS.length]
        });
      }
    }
  }

  const isLoading = isLoadingProjects || (projects.length > 0 && isLoadingData);

  if (isLoading) {
    return <p style={{textAlign: 'center', marginTop: '3rem'}}>Scanning the blockchain for your investments...</p>;
  }

  return (
    <>
      <PortfolioSummary totalInvested={totalInvested} projectedReturn={totalProjectedReturn} chartData={chartData} />
      
      <div style={assetsContainerStyle}>
        <h2 style={assetsHeaderStyle}>My Assets</h2>
        
        <div style={assetsGridStyle}>
            {ownedProjects.length > 0 ? (
            ownedProjects.map((projectAddress: Address) => (
                <DashboardProjectCard key={projectAddress} address={projectAddress} />
            ))
            ) : (
            <div style={emptyStateStyle}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    You have not invested in any projects yet.
                </p>
            </div>
            )}
        </div>
      </div>
    </>
  );
}

// --- NEW & UPDATED STYLES ---
const assetsContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '900px',
  margin: '3rem auto 0',
};

const assetsHeaderStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    paddingBottom: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--border-color)',
};

const assetsGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '2rem',
};

const emptyStateStyle: React.CSSProperties = {
  padding: '3rem',
  textAlign: 'center',
  backgroundColor: 'rgba(44, 47, 54, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
};