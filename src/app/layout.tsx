import '../index.css';
import '../colors.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ContextProvider from '../context/contextProvider';

export const metadata = {
  title: 'App',
  description: 'Migrated to Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ContextProvider>{children}</ContextProvider>
        </Provider>
      </body>
    </html>
  );
}
