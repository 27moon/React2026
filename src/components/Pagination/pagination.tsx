'use client';

import './pagination.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useSearchParams, useRouter } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Pagination must be used within ThemeProvider');
  }

  const { theme } = context;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="pagination-wrapper">
      <button
        disabled={currentPage <= 1}
        className={`${currentPage <= 1 ? 'btn-disabled' : 'btn-active'} ${theme}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      <div>
        {currentPage} / {totalPages}
      </div>

      <button
        disabled={currentPage >= totalPages}
        className={`${currentPage >= totalPages ? 'btn-disabled' : 'btn-active'} ${theme}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
