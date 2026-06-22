'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h2>Something went wrong</h2>

      <p style={{ maxWidth: 500 }}>
        {error.message || 'Unexpected error occurred'}
      </p>

      <button
        onClick={() => reset()}
        style={{
          padding: '10px 16px',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}
