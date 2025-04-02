import { Inter } from 'next/font/google';
import './globals.css';

import Navigation from './components/navigation/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Go Yours：專業日本留學代辦｜打工度假｜高優國際｜實現你的日本生活夢！',
  description:
    '一群熱血的年輕人，用盡一生的愛告訴大家出國打工度假/遊學的小撇步。讓Go Yours完成你的打工度假與留學的夢想！',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
