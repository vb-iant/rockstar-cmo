export const metadata = {
  title: 'Rockstar CMO',
  description: 'Marketing wisdom for CMOs, one episode at a time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
