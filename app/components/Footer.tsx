'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          © {currentYear} Urbane Digital Assets. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

// --- STYLES ---

const footerStyle: React.CSSProperties = {
  width: '100%',
  borderTop: '1px solid var(--border-color)',
  padding: '2rem 1.5rem',
  backgroundColor: 'rgba(30, 30, 30, 0.5)', 
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
};

const footerContainerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
};