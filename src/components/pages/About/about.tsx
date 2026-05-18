import { Link } from 'react-router';
import './about.css';

export const About = () => {
  return (
    <>
      <div className="container">
        <div className="wrapper">
          <p>Find info about Rick and Morty characters.</p>

          <p>Created by 27moon. No Mortys were harmed during development.</p>

          <p>I was told this page needs author information. So… hi.</p>

          <p>I code, I panic, I commit.</p>

          <a
            href="https://github.com/27moon"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link className="nav-link" to={`/`}>
            <button>Back</button>
          </Link>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="img-logo"></div>
          </a>
        </div>
      </div>
    </>
  );
};
