import '../index.css';
import '../colors.css';
import Providers from './providers';

export const metadata = {
  title: 'Search App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
