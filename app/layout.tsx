import { Metadata } from 'next';
import './globals.css';

const title = '每日打卡';

export const metadata: Metadata = {
  title,
  description: title,
  applicationName: title,
  authors: {
    name: 'Roy QIU',
    url: 'karoyqiu@gmail.com',
  },
  appleWebApp: {
    capable: true,
    title,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  viewport: {
    minimumScale: 1,
    initialScale: 1,
    width: 'device-width',
    userScalable: false,
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="flex flex-col">
        <nav className="navbar bg-neutral text-neutral-content px-4">
          <label className="label flex-1">
            <span className="text-lg">
              {title}
            </span>
          </label>
        </nav>
        <main className="flex flex-col gap-4">
          {children}
        </main>
      </body>
    </html>
  );
}
