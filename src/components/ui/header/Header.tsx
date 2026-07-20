import { Button } from '../button/Button';

type FormType = 'uncontrolled' | 'rhf';

type HeaderProps = {
  onOpen: (type: FormType) => void;
};

export const Header = ({ onOpen }: Readonly<HeaderProps>) => {
  const handleUncontrolledClick = () => onOpen('uncontrolled');
  const handleRHFClick = () => onOpen('rhf');
  return (
    <header className="header">
      <h1>Forms</h1>

      <div className="forms-wrapper">
        <Button onClick={handleUncontrolledClick}>+ Uncontrolled Form</Button>
        <Button onClick={handleRHFClick}>+ RHF Form</Button>
      </div>
    </header>
  );
};
