import { useSearchParams } from 'react-router';
import './pagination.css';

type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page'));

  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage));

      return prev;
    });
  };

  return (
    <div className="pagination-wrapper">
      <button
        disabled={currentPage <= 1}
        className={currentPage <= 1 ? 'btn-disabled' : 'btn-active'}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      <div>
        {`${currentPage} `} / {`${totalPages}`}
      </div>
      <button
        disabled={currentPage >= totalPages}
        className={currentPage >= totalPages ? 'btn-disabled' : 'btn-active'}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
