import { selectSubmissions } from '../../store/formDataSlice';
import { useAppSelector } from '../../store/hooks';
import { Card } from './Card';
import './Dashboard.css';

export const Dashboard = () => {
  const submissions = useAppSelector(selectSubmissions);

  return (
    <div className="dashboard">
      <h2>Submitted Forms</h2>

      {submissions.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        <div className="card-grid">
          {submissions.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
