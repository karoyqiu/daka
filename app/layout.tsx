import './globals.css';

export const metadata = {
  title: '打卡',
  description: '每日打卡',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="flex flex-col">
        <div className="navbar bg-neutral text-neutral-content px-4">
          <label className="label flex-1">
            <span className="text-lg">
              {metadata.title}
            </span>
          </label>
        </div>
        <main className="flex flex-col gap-4">
          {children}
        </main>
      </body>
    </html>
  );
}
