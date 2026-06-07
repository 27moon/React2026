import { Layout } from './components/layout/Layout';
import './App.css';
import { Header } from './components/ui/header/Header';

function App() {
  return (
    <Layout className={'app-layout'}>
      <Header />
    </Layout>
  );
}

export default App;
