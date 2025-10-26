'use client';

import React from 'react';

// A reusable icon for linking to Etherscan
const EtherscanIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

export function EtherscanLink({ type, address }: { type: 'address' | 'tx'; address: string }) {
    const url = `https://sepolia.etherscan.io/${type}/${address}`;
    return (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={linkStyle}
            // This is the crucial fix for this file
            onClick={(e) => e.stopPropagation()}
        >
            <EtherscanIcon />
        </a>
    );
}

const linkStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8px',
    opacity: 0.6,
    transition: 'opacity 0.2s',
};

//app_staging_5db6f0023bad97df254727e305c9338a