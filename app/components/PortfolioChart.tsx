'use client';

import React from 'react';

interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

interface PortfolioChartProps {
  data: ChartSegment[];
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  if (!data || data.length === 0) {
    return <div style={{height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>No investment data available.</div>;
  }

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedAngle = -90; // Start from the top

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <svg width="150" height="150" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--border-color)" strokeWidth="2" />
        {data.map((segment, index) => {
          const percentage = (segment.value / totalValue) * 100;
          const strokeDasharray = `${percentage} ${100 - percentage}`;
          const transform = `rotate(${accumulatedAngle} 18 18)`;
          accumulatedAngle += (percentage / 100) * 360;

          return (
            <circle
              key={index}
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke={segment.color}
              strokeWidth="2.5"
              strokeDasharray={strokeDasharray}
              transform={transform}
              style={{ transition: 'stroke-dasharray 0.3s' }}
            />
          );
        })}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((segment, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: segment.color }}></span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{segment.label}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{((segment.value / totalValue) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}