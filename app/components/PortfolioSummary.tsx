'use client';

import { PortfolioChart } from "./PortfolioChart";

interface PortfolioSummaryProps {
    totalInvested: number;
    projectedReturn: number;
    chartData: { label: string; value: number; color: string; }[];
}

export function PortfolioSummary({ totalInvested, projectedReturn, chartData }: PortfolioSummaryProps) {
    const blendedApy = totalInvested > 0 ? (projectedReturn / totalInvested) * 100 : 0;

    return(
        <div style={summaryContainerStyle}>
            <div style={leftColumnStyle}>
                <h3 style={sectionTitleStyle}>Asset Allocation</h3>
                <PortfolioChart data={chartData} />
            </div>
            
            <div style={dividerStyle}></div>

            <div style={rightColumnStyle}>
                 <div style={{textAlign: 'center'}}>
                    <p style={statLabelStyle}>Total Invested</p>
                    <p style={statValueStyle}>{totalInvested.toFixed(3)} ETH</p>
                </div>
                <div style={{textAlign: 'center'}}>
                    <p style={statLabelStyle}>Blended APY</p>
                    <p style={{...statValueStyle, ...gradientTextStyle}}>{blendedApy.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
}

// --- STYLES ---
const summaryContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'rgba(44, 47, 54, 0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    padding: '2rem 3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
};

const leftColumnStyle: React.CSSProperties = {
    flex: '1.5',
};

const rightColumnStyle: React.CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
};

const dividerStyle: React.CSSProperties = {
    width: '1px',
    height: '120px',
    background: 'linear-gradient(to bottom, transparent, var(--border-color), transparent)',
};

const sectionTitleStyle: React.CSSProperties = {
    margin: '0 0 1.5rem 0',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
};

const statLabelStyle: React.CSSProperties = {
    margin: 0,
    color: 'var(--text-secondary)',
    fontSize: '1rem',
};

const statValueStyle: React.CSSProperties = {
    margin: '0.25rem 0 0',
    fontSize: '2.5rem',
    fontWeight: 700,
};

const gradientTextStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(45deg, #CFB53B, #E6D3A3)',
    WebkitBackdropFilter: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
};