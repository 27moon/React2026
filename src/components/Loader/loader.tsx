import Image from 'next/image';
import load from '../../assets/load.gif';
import './loader.css';

export function Loader() {
  return (
    <div data-testid="loader">
      <Image src={load} alt="loading" className="load" />
    </div>
  );
}
