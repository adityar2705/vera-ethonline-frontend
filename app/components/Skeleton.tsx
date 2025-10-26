'use client';

import React from 'react';

// A reusable skeleton loader component with a shimmering animation.
export function Skeleton({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ ...skeletonBaseStyle, ...style }}>
      <div style={shimmerStyle}></div>
    </div>
  );
}

const skeletonBaseStyle: React.CSSProperties = {
  backgroundColor: 'var(--surface-color-2)',
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden',
};

const shimmerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
  animation: 'shimmer 1.5s infinite',
};

// We'll add the @keyframes for the shimmer animation in our globals.css file next.
