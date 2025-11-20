import './globals.css';

export const metadata = {
  title: 'Job Listing App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-white shadow p-4 mb-6 flex gap-6 text-lg">
          <a href="/" className="hover:text-blue-600">Dashboard</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}