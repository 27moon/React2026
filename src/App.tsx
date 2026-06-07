import { Layout } from './components/layout/Layout';
import './App.css';
import { Header } from './components/ui/header/Header';
import { Modal } from './components/ui/modal/Modal';

import { useModal } from './hooks/useModal';
import { UncontrolledForm } from './components/forms/uncontrolledForm/UncontrolledForm';
import { RHFForm } from './components/forms/rhfForm/rhfForm';

function App() {
  const { open, formType, openModal, closeModal } = useModal();

  return (
    <Layout className="app-layout">
      <Header onOpen={openModal} />

      <Modal open={open} onClose={closeModal}>
        {formType === 'uncontrolled' && <UncontrolledForm />}
        {formType === 'rhf' && <RHFForm />}
      </Modal>
    </Layout>
  );
}

export default App;
