import { Link } from 'react-router';
import './navigation.css';
import type { FC } from 'react';

type Props = {
  items: string[];
  className?: string;
  onClick?: () => void;
};

export const Navigation: FC<Props> = ({ items }) => {
  return (
    <>
      <nav className={'nav-menu'}>
        <ul>
          {items.map((item) => (
            <li key={item} className={`li-menu`}>
              <Link className="nav-link" to={`/${item}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
