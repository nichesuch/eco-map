import type { Metadata } from 'next'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import './globals.css'
import PrelineLoader from '@/components/PrelineLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '環境マップ',
  description: '環境センサーのデータを地図上にビジュアライズ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/image/favicon.png" />
      </head>
      <body className={inter.className}>
        <PrelineLoader />
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm text-baseline py-4 bg-white dark:bg-gray-800">
          <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
            <div className="flex items-center justify-between">
              <a className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white" href="/">
                <Image src="/image/dark_logo.svg" alt="ロゴ" width={120} height={35} className="hidden dark:sm:block " />
                <Image src="/image/light_logo.svg" alt="ロゴ" width={120} height={35} className="hidden dark:sm:hidden sm:block" />
                <Image src="/image/main_logo.svg" alt="ロゴ" width={35} height={35} className="sm:hidden" />
                環境マップ
              </a>
              <div className="sm:hidden">
                <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-image-and-text-2" aria-controls="navbar-image-and-text-2" aria-label="Toggle navigation">
                  <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                  <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
            </div>
            <div id="navbar-image-and-text-2" className="hs-collapse hidden overflow-hidden transition-all duration-300 grow sm:block">
              <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="https://minatomirai-environment.peatix.com/view">Peatix</a>
                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/map">Map</a>
                <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="/docs">Docs</a>
              </div>
            </div>
          </nav>
        </header>
        <div style={{ minHeight: "50vh" }}>
          {children}
        </div>
        <footer className='bg-gray-800 text-white p-5'>
          <div className="footer-logo text-center">
            <a href="https://code4.yokohama">
              coded by <Image className="inline-block" width={100} height={100} alt='ロゴ' src="/image/dark_logo.svg" />
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
