import { Link } from 'react-router';
import './not-found.css';

export const NotFound = () => {
  return (
    <>
      <section className="no-page">
        <div className="no-page-container">
          <h1>404</h1>
          <p>Oops! Such page does not exist...</p>
          <button className="go-home-button">
            <Link to="/">Back to the main page</Link>
          </button>
        </div>
      </section>
    </>
  );
};
