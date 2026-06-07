import { Button } from '../button/Button';

export const Header = () => {
  return (
    <header className="header">
      <h1>Forms</h1>

      <div className="forms-wrapper">
        <Button>+ Uncontrolled Form</Button>

        <Button>+ RHF Form</Button>
      </div>
    </header>
  );
};
